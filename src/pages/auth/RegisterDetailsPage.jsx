import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/authSlice';
import { register } from '../../services/auth/authService';
import AuthLayout from '../../components/templates/AuthLayout';
import FormField from '../../components/molecules/FormField';

const RegisterDetailsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // 1. Get the data from Step 1 (RegisterForm.jsx)
    const location = useLocation();
    const stepOneData = location.state?.stepOneData;

    // If a user lands here directly, redirect them back to step 1
    if (!stepOneData) {
        navigate('/register');
        return null;
    }

    // 2. State for all our new fields
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [bankName, setBankName] = useState('');
    
    const [error, setError] = useState(null);

    // 3. This is the REAL submit handler that calls the API
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        // 4. Combine data from Step 1 and Step 2
        const fullRegistrationData = {
            ...stepOneData, // email, password, role
            phoneNumber,
            firstName,
            lastName,
            bio,
            bankAccountNumber: bankAccount,
            bankName,
            // You can add more fields here
        };

        try {
            // 5. Call the register service with the complete data object
            const authResponse = await register(fullRegistrationData);

            // 6. Dispatch to Redux
            const payload = {
                user: {
                    userId: authResponse.userId,
                    email: authResponse.email,
                    role: authResponse.role
                },
                token: authResponse.token
            };
            dispatch(loginSuccess(payload));

            // 7. Navigate to the dashboard
            navigate('/dashboard');

        } catch (apiError) {
            setError(apiError.message);
        }
    };

    // 8. Render different form fields based on the role from Step 1
    const renderRoleFields = () => {
        switch (stepOneData.role) {
            case 'Tutor':
                return (
                    <>
                        <FormField id="firstName" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        <FormField id="lastName" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        <FormField id="bio" label="Bio (A short intro)" value={bio} onChange={(e) => setBio(e.target.value)} required />
                        <FormField id="bankAccount" label="Bank Account Number" value={bankAccount} onChange={(e) => setBankAccount(e.g.target.value)} required />
                        <FormField id="bankName" label="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} required />
                    </>
                );
            case 'Student':
                return (
                    <>
                        {/* Example: Add fields for Student */}
                        <FormField id="firstName" label="Full Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        {/* <FormField id="school" label="School Name" value={school} onChange={(e) => setSchool(e.target.value)} /> */}
                    </>
                );
            case 'Institute':
                 return (
                    <>
                        {/* Example: Add fields for Institute */}
                        <FormField id="instituteName" label="Institute Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        {/* <FormField id="address" label="Address" value={address} onChange={(e) => setAddress(e.target.value)} /> */}
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
                    <FormField id="phoneNumber" label="Phone Number" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    
                    {/* Render the fields specific to the role */}
                    {renderRoleFields()}

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
