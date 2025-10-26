import React from 'react';
import SocialLoginButton from '../molecules/SocialLogin/SocialLoginButton';
import FormField from '../molecules/FormField';
import PasswordInput from '../molecules/PasswordInput';

const LoginForm = ({ onSwitchToRegister }) => (
    <div className="w-full">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">Log in to your account</h1>
        <div className="mt-6 space-y-4">
            <SocialLoginButton provider="google">Continue with Google</SocialLoginButton>
            <SocialLoginButton provider="apple">Continue with Apple</SocialLoginButton>
        </div>

        <div className="my-6 flex items-center">
            {/* ... (divider code) ... */}
        </div>

        <form className="space-y-4">
            <FormField id="email" label="Email" type="email" placeholder="you@example.com" />
            <PasswordInput id="password" label="Password" placeholder="••••••••" />
            <div className="text-right">
                {/* ... (forgot password link) ... */}
            </div>
            <button
              type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
            >
                Log In
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

export default LoginForm;