import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../store/authSlice.js';
import { login, socialLogin } from '../../services/auth/authService.js';
import SocialLoginButton from '../molecules/SocialLogin/SocialLoginButton.jsx';
import FormField from '../molecules/FormField.jsx';
import PasswordInput from '../molecules/PasswordInput.jsx';
import { validateSocialProvider } from '../../utils/validators.js';

const LoginForm = ({ onSwitchToRegister }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [appleError, setAppleError] = useState('');

    // GOOGLE LOGIN HANDLER
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const payload = {
                    provider: "google",
                    idToken: tokenResponse.access_token,
                    role: null 
                };
        
                const data = await socialLogin(payload);
        
                // FIX: Construct user object from flat backend response
                const userObj = {
                    userId: data.userId,
                    email: data.email,
                    role: data.role,
                    // Map other fields if your backend sends them (e.g., firstName)
                    firstName: data.firstName, 
                    lastName: data.lastName
                };

                // Save to Redux
                dispatch(loginSuccess({ user: userObj, token: data.token }));
        
                // Redirect to Dashboard
                navigate('/dashboard', { replace: true });

            } catch (err) {
                console.error("Login failed:", err);
                setError(err.message || "Social login failed"); 
            }
        },
        onError: () => setError('Google login failed.'),
    });

     const handleAppleLogin = () => {
        setAppleError(''); 
        const validation = validateSocialProvider('apple');
        
        if (!validation.isValid) {
            setAppleError(validation.message);
            return;
        }
    };

    // MANUAL LOGIN
    const handleManualLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (password.length < 6 || password.length > 10) {
            setError("Password must be between 6 and 10 characters.");
            setLoading(false);
            return;
        }

        try {
            const data = await login(identifier, password);
            
            // FIX: Construct user object from flat backend response
            const userObj = {
                userId: data.userId,
                email: data.email,
                role: data.role,
                firstName: data.firstName,
                lastName: data.lastName
            };

            dispatch(loginSuccess({ user: userObj, token: data.token }));
            
            // Redirect to Dashboard
            navigate('/dashboard', { replace: true });

        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-2xl font-semibold text-gray-900 text-center">Log in to your account</h1>

            <div className="mt-6 space-y-4">
                <SocialLoginButton
                    provider="google"
                    type="button"
                    onClick={() => handleGoogleLogin()}
                >
                    Continue with Google
                </SocialLoginButton>
                    <div className="flex flex-col">
                <SocialLoginButton 
                        provider="apple" 
                        type="button"
                        onClick={handleAppleLogin}
                    >
                        Continue with Apple
                </SocialLoginButton>
                    
                    {appleError && (
                        <p className="text-xs text-red-500 mt-2 text-center font-medium ">
                            {appleError}
                        </p>
                    )}
                </div>
            </div>

            <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-xs font-medium text-gray-500">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <form className="space-y-4" onSubmit={handleManualLogin}>
                <FormField
                    id="identifier"
                    label="Email or Mobile Number"
                    type="text"
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
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError('');
                    }}
                    required
                />

                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
                        {error}
                    </div>
                )}

                <div className="text-right">
                    <a href="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline">
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