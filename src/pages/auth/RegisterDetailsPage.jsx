import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/templates/AuthLayout.jsx';
import FormField from '../../components/molecules/FormField.jsx';
import { ROLES } from '../../utils/constants';
import { validatePhoneNumber } from '../../utils/validators';
import { extractErrorMessage } from '../../utils/helpers';
import useAuth from '../../hooks/useAuth';
import { socialLogin } from '../../services/auth/authService.js'; 

const RegisterDetailsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { register: manualRegister, login: reduxLogin } = useAuth(); 
    
    // Check both standard data and social data
    const stepOneData = location.state?.stepOneData;
    const socialProfile = location.state?.socialProfile;

    useEffect(() => {
        if (!stepOneData) {
            navigate('/register');
        }
    }, [stepOneData, navigate]);

    if (!stepOneData) return null;

    // Determine if this is a social flow
    const isSocial = stepOneData.isSocial === true;

    // State
    const [formData, setFormData] = useState({
        phoneNumber: '',
        firstName: socialProfile?.firstName || '', // Pre-fill from Google
        lastName: socialProfile?.lastName || '',   // Pre-fill from Google
        bio: '',
        bankAccount: '',
        bankName: '',
        school: '',
        grade: '',
        parentName: '',
        dateOfBirth: '',
        instituteName: '',
        address: ''
    });

    const [errors, setErrors] = useState({});
    const [globalError, setGlobalError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: null }));
        }
    };

    const handlePhoneBlur = () => {
        const validation = validatePhoneNumber(formData.phoneNumber);
        if (!validation.isValid) {
            setErrors(prev => ({ ...prev, phoneNumber: validation.message }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setGlobalError(null);

        const phoneValidation = validatePhoneNumber(formData.phoneNumber);
        if (!phoneValidation.isValid) {
            setErrors(prev => ({ ...prev, phoneNumber: phoneValidation.message }));
            return;
        }

        setIsSubmitting(true);
        const cleanDateOfBirth = formData.dateOfBirth === '' ? null : formData.dateOfBirth;

        try {
            if (isSocial) {
                // SOCIAL REGISTER FLOW 
                const payload = {
                    provider: stepOneData.provider, // "Google"
                    idToken: socialProfile.idToken, // The token from Google
                    role: stepOneData.role,
                    // Extra Profile Data
                    phoneNumber: formData.phoneNumber,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    bio: formData.bio,
                    bankAccountNumber: formData.bankAccount,
                    bankName: formData.bankName,
                    schoolName: formData.school,
                    grade: formData.grade,
                    parentName: formData.parentName,
                    dateOfBirth: cleanDateOfBirth,
                    instituteName: formData.instituteName,
                    address: formData.address
                };

                // Call the updated Social Login Endpoint
                const response = await socialLogin(payload);
                navigate('/dashboard'); 
            } else {
                // MANUAL REGISTER FLOW
                const fullRegistrationData = {
                    ...stepOneData,
                    ...formData,
                    schoolName: formData.school,
                    bankAccountNumber: formData.bankAccount,
                    dateOfBirth: cleanDateOfBirth,
                    ExperienceYears: 0,
                    instituteName: formData.instituteName,
                    address: formData.address
                };
                
                const result = await manualRegister(fullRegistrationData);
                if (result.success) {
                    navigate('/dashboard');
                } else {
                    setGlobalError(extractErrorMessage(result.error));
                }
            }
        } catch (error) {
             setGlobalError(isSocial ? error.message : "Registration failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderRoleFields = () => {
        switch (stepOneData.role) {
            case ROLES.TUTOR:
                return (
                    <>
                        <FormField id="firstName" label="First Name" value={formData.firstName} onChange={handleChange} required />
                        <FormField id="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} required />
                        <FormField id="bio" label="Bio" value={formData.bio} onChange={handleChange} />
                        <FormField id="bankAccount" label="Bank Account" value={formData.bankAccount} onChange={handleChange} />
                        <FormField id="bankName" label="Bank Name" value={formData.bankName} onChange={handleChange} />
                    </>
                );
            case ROLES.STUDENT:
                return (
                    <>
                        <FormField id="firstName" label="First Name" value={formData.firstName} onChange={handleChange} required />
                        <FormField id="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} required />
                        <FormField id="school" label="School Name" value={formData.school} onChange={handleChange} />
                        <FormField id="grade" label="Grade" value={formData.grade} onChange={handleChange} />
                        <FormField id="parentName" label="Parent Name" value={formData.parentName} onChange={handleChange} />
                        <FormField id="dateOfBirth" label="Date of Birth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
                    </>
                );
            case ROLES.INSTITUTE:
                return (
                    <>
                        <FormField id="instituteName" label="Institute Name" value={formData.instituteName} onChange={handleChange} required />
                        <FormField id="address" label="Address" value={formData.address} onChange={handleChange} required />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <AuthLayout>
            <div className="w-full">
                <h1 className="text-2xl font-semibold text-gray-900 text-center">
                    {isSocial ? `Complete your ${stepOneData.provider} Sign up` : 'Tell us about yourself'}
                </h1>

                <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
                    <FormField
                        id="phoneNumber"
                        label={<>Phone Number <span className="text-red-500">*</span></>}
                        type="tel"
                        placeholder="0712345678"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        onBlur={handlePhoneBlur}
                        error={errors.phoneNumber}
                    />
                    {renderRoleFields()}
                    
                    {globalError && (
                        <p className="text-xs text-red-500 mt-1 text-center">{globalError}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all"
                    >
                        {isSubmitting ? 'Completing...' : 'Complete Registration'}
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default RegisterDetailsPage;