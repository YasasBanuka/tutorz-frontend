import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialLoginButton from '../molecules/SocialLogin/SocialLoginButton.jsx';
import FormField from '../molecules/FormField.jsx';
import PasswordInput from '../molecules/PasswordInput.jsx';
import Label from '../atoms/Label.jsx';
import Select from '../atoms/Select.jsx';
import { checkEmailExists } from '../../services/auth/authService.js';
import { validateEmail } from '../../utils/validators.js';

const RegisterForm = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Student');
    const [emailError, setEmailError] = useState(''); 
    const [isChecking, setIsChecking] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setEmailError('');

            const emailValidation = validateEmail(email);
            if (!emailValidation.isValid) {
            setEmailError(emailValidation.message);
            return;
            }

        setIsChecking(true);

        try {
            // Check if email exists in Backend
            const exists = await checkEmailExists(email);

            if (exists) {
                setEmailError('User with this email already exists.');
                setIsChecking(false);
                return; 
            }

            // If email is valid and new, proceed to next step
            const stepOneData = {
                email,
                password,
                role
            };

            navigate('/register-details', { state: { stepOneData } });
        } catch (error) {
            console.error(error);
            setEmailError('Something went wrong. Please try again.');
        } finally {
            setIsChecking(false);
        }
    };

    return (
     <div className="w-full">
            <h1 className="text-2xl font-semibold text-gray-900 text-center">Create your account</h1>
            <div className="mt-6 space-y-4">
                <SocialLoginButton provider="google">Sign up with Google</SocialLoginButton>
                <SocialLoginButton provider="apple">Sign up with Apple</SocialLoginButton>
            </div>
            <div className="my-6 flex items-center">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-4 text-sm font-medium text-gray-500">OR</span>
                <hr className="flex-grow border-gray-300" />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <FormField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError(''); 
                    }}
                    required
                    error={emailError} 
                />
                <PasswordInput
                    id="password"
                    label="Password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div>
                    <Label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                        I am a...
                    </Label>
                    <Select
                        id="role"
                        name="role"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="Student">Student/Parent</option>
                        <option value="Tutor">Tutor</option>
                        <option value="Institute">Institute</option>
                    </Select>
                </div>
                <button
                    type="submit"
                    disabled={isChecking} 
                    className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-lg 
                        ${isChecking ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'} 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md`}
                >
                    {isChecking ? 'Checking...' : 'Next'}
                </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button onClick={onSwitchToLogin} className="font-medium text-blue-600 hover:underline">
                    Log In
                </button>
            </p>
        </div>
    );
};

export default RegisterForm;