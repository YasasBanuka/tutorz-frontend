import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/templates/AuthLayout';
import PasswordInput from '../../components/molecules/PasswordInput';
import { resetPassword } from '../../services/auth/authService';

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token'); 
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Add Length Check
        if (password.length < 6 || password.length > 10) {
            setError("Password must be between 6 and 10 characters.");
            return;
        }

        // Existing Match Check
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        try {
            await resetPassword(token, password);
            alert("Password Reset Successfully! Please login.");
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };
    if (!token) return <AuthLayout><p className="text-red-500">Invalid Link</p></AuthLayout>;

    return (
        <AuthLayout>
            <h2 className="text-2xl font-bold text-center mb-4">Set New Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <PasswordInput 
                    id="new-pass" 
                    label="New Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <PasswordInput 
                    id="conf-pass" 
                    label="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                />
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
                    Reset Password
                </button>
            </form>
        </AuthLayout>
    );
};

export default ResetPasswordPage;