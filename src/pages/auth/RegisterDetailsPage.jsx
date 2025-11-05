import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/authSlice.js';
import { register } from '../../services/auth/authService.js';
import AuthLayout from '../../components/templates/AuthLayout.jsx';
import FormField from '../../components/molecules/FormField.jsx';
import ErrorMessage from '../../components/atoms/ErrorMessage.jsx';
import Label from '../../components/atoms/Label.jsx';

const RegisterDetailsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const location = useLocation();
    const stepOneData = location.state?.stepOneData;

    if (!stepOneData) {
        navigate('/register');
        return null;
    }

    // State for all our new fields
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [bankName, setBankName] = useState('');
    const [school, setSchool] = useState('');
    const [grade, setGrade] = useState('');
    const [parentName, setParentName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    
    const [error, setError] = useState(null); 
    const [phoneError, setPhoneError] = useState(null); 

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);

        const sriLankanPhoneRegex = /^07\d{8}$/;

        if (value === '') {
            setPhoneError('Phone number is required.');
        } else if (!sriLankanPhoneRegex.test(value)) {
            setPhoneError('Must be 10 digits starting with 07 (e.g., 0712345678).');
        } else {
            setPhoneError(null); 
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null); 

        // Manually trigger validation one last time
        handlePhoneChange({ target: { value: phoneNumber } });
        
        if (phoneError) {
            return; 
        }

        // This object now matches your backend DTO and AuthService
        const fullRegistrationData = {
            ...stepOneData, 
            phoneNumber,
            firstName,
            lastName,
            schoolName: school, 
            grade,
            parentName,
            dateOfBirth: dateOfBirth || null,
            bio,
            bankAccountNumber: bankAccount,
            bankName,
            ExperienceYears: 0 
        };

        try {
            const authResponse = await register(fullRegistrationData);

            const payload = {
                user: {
                    userId: authResponse.userId,
                    email: authResponse.email,
                    role: authResponse.role
                },
                token: authResponse.token
            };
            dispatch(loginSuccess(payload));

            navigate('/dashboard');

        } catch (apiError) {
            // reads the error message from your backend
            if (apiError.response && apiError.response.data && apiError.response.data.message) {
                setError(apiError.response.data.message);
            } else {
                setError(apiError.message);
            }
        }
    };

    // Render different form fields based on the role
    const renderRoleFields = () => {
        switch (stepOneData.role) {
            case 'Tutor':
                return (
                    <>
                        <FormField id="firstName" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        <FormField id="lastName" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        <FormField id="bio" label="Bio (A short intro)" value={bio} onChange={(e) => setBio(e.target.value)} />
                        <FormField id="bankAccount" label="Bank Account Number" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} />
                        <FormField id="bankName" label="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                    </>
                );
            case 'Student':
                return (
                    <>
                        <FormField id="firstName" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        <FormField id="lastName" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        <FormField id="school" label="School Name" value={school} onChange={(e) => setSchool(e.target.value)} />
                        <FormField id="grade" label="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
                        <FormField id="parentName" label="Parent/Guardian Name" value={parentName} onChange={(e) => setParentName(e.target.value)} />
                        <FormField id="dateOfBirth" label="Date of Birth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                    </>
                );
            case 'Institute':
                 return (
                    <>
                        <FormField id="instituteName" label="Institute Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <AuthLayout>
            <div className="w-full">
                <h1 className="text-2xl font-semibold text-gray-900 text-center">Tell us about yourself</h1>
                <p className="text-center text-sm text-gray-600 mt-1">You are registering as a {stepOneData.role}.</p>
                
                <form className="space-y-4 mt-6" onSubmit={handleSubmit}>

                    <FormField
                        id="phoneNumber"
                        label={<>Phone Number <span className="text-red-500">*</span></>}
                        type="tel"
                        placeholder="0712345678"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        error={phoneError} 
                    />
                    
                    {renderRoleFields()}

                    {/* This is for backend errors */}
                    {error && (
                        <p className="text-xs text-red-500 mt-1">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                        Complete Registration
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default RegisterDetailsPage;