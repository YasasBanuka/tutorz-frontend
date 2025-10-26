import React from 'react';
// External Packages
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
// Local Project Files (Relative Paths)
import { loginSuccess } from '../../store/authSlice.js'; // From store
import SocialLoginButton from '../molecules/SocialLogin/SocialLoginButton.jsx'; // From molecules/SocialLogin
import FormField from '../molecules/FormField.jsx'; // From molecules
import PasswordInput from '../molecules/PasswordInput.jsx'; // From molecules
import Label from '../atoms/Label.jsx'; // From atoms
import Select from '../atoms/Select.jsx'; // From atoms
import { apiClient } from '../../services/api/apiClient.js'; // From services/api

const LoginForm = ({ onSwitchToRegister }) => {
    const dispatch = useDispatch();
    const [selectedRole, setSelectedRole] = React.useState('Student'); // Default to Student

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        console.log("Google login success:", credentialResponse);
        console.log("Selected role:", selectedRole);
        try {
        const payload = {
            provider: "google",
            idToken: credentialResponse.credential,
            role: selectedRole
        };
        console.log("Sending payload:", payload);
        
        const response = await apiClient.post('/api/auth/social-login', payload);

        const { user, token } = response.data;
        dispatch(loginSuccess({ user, token }));

    } catch (err) {
        console.error("Backend login failed:", err);
        console.error("Error response:", err.response?.data); 
    }
    };

    const handleGoogleLoginError = () => {
        console.error('Google login failed');
    };

    return (
        <div className="w-full">
            <h1 className="text-2xl font-semibold text-gray-900 text-center">Log in to your account</h1>

            {/* Role Selector */}
            <div className="my-4">
                 <Label htmlFor="role-login" className="block text-sm font-medium text-gray-700 mb-1">
                     I am a...
                 </Label>
                 <Select
                     id="role-login"
                     name="role-login"
                     value={selectedRole}
                     onChange={(e) => setSelectedRole(e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                 >
                     <option value="Student">Student/Parent</option>
                     <option value="Tutor">Tutor</option>
                     <option value="Institute">Institute</option>
                 </Select>
             </div>

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

            {/* Email/Password Form */}
            <form className="space-y-4">
                <FormField id="email" label="Email" type="email" placeholder="you@example.com" />
                <PasswordInput id="password" label="Password" placeholder="••••••••" />
                <div className="text-right">
                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                        Forgot password?
                    </a>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                    Log In
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

