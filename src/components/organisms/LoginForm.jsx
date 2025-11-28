import React, { useState } from 'react';
// External Packages
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
// Local Project Files (Relative Paths)
import { loginSuccess } from '../../store/authSlice.js'; 
import { login } from '../../services/auth/authService.js'; 
import SocialLoginButton from '../molecules/SocialLogin/SocialLoginButton.jsx'; 
import FormField from '../molecules/FormField.jsx'; 
import PasswordInput from '../molecules/PasswordInput.jsx'; 
import apiClient from '../../services/api/apiClient';

const LoginForm = ({ onSwitchToRegister }) => {
    const dispatch = useDispatch();
    
    // State Management
    const [selectedRole, setSelectedRole] = useState('Student'); 
    const [identifier, setIdentifier] = useState(''); // Stores Email OR Phone
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // UI loading state

    // --- MANUAL LOGIN HANDLER (Email/Phone) ---
    const handleManualLogin = async (e) => {
        e.preventDefault(); // Stop page refresh
        setError('');
        setLoading(true);

        try {
            // Call the service we updated earlier
            const data = await login(identifier, password);
            
            // Dispatch to Redux (Updates global state)
            dispatch(loginSuccess({ user: data.user, token: data.token }));
            
            // listens to 'isAuthenticated' from Redux.
        } catch (err) {
            // Show error to user
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    // --- GOOGLE LOGIN HANDLER ---
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        console.log("Google login success:", credentialResponse);
        try {
            const payload = {
                provider: "google",
                idToken: credentialResponse.credential,
                role: selectedRole
            };
            
            // Note: Ensure your apiClient baseURL + this path is correct
            const response = await apiClient.post('/auth/social-login', payload);

            const { user, token } = response.data;
            dispatch(loginSuccess({ user, token }));

        } catch (err) {
            console.error("Backend login failed:", err);
            setError(err.response?.data?.message || "Social login failed");
        }
    };

    const handleGoogleLoginError = () => {
        console.error('Google login failed');
        setError('Google login failed. Please try again.');
    };

    return (
        <div className="w-full">
            <h1 className="text-2xl font-semibold text-gray-900 text-center">Log in to your account</h1>   

            {/* Social Login Buttons */}
            <div className="mt-6 space-y-4">
                {/* Google Login */}
                <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-full opacity-0 z-10 cursor-pointer">
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={handleGoogleLoginError}
                            useOneTap={false}
                        />
                    </div>
                    <SocialLoginButton provider="google" type="button">
                        Continue with Google
                    </SocialLoginButton>
                </div>

                {/* Apple Login */}
                <SocialLoginButton provider="apple" type="button">
                    Continue with Apple
                </SocialLoginButton>
            </div>

            {/* OR Divider */}
            <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-xs font-medium text-gray-500">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* --- MANUAL FORM --- */}
            <form className="space-y-4" onSubmit={handleManualLogin}>
                <FormField 
                    id="identifier" 
                    label="Email or Mobile Number" 
                    type="text" // 'text' allows both email and numbers
                    placeholder="you@example.com or 0712345678"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                />
                
                <PasswordInput 
                    id="password" 
                    label="Password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                {/* Error Display */}
                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="text-right">
                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                        Forgot password?
                    </a>
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-lg 
                        ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'} 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm`}
                >
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
            </form>

            {/* Switch to Register */}
            <p className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button onClick={onSwitchToRegister} className="font-medium text-blue-600 hover:underline">
                    Register
                </button>
            </p>
        </div>
    );
};

export default LoginForm;