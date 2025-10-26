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
                className="w-full bg-blue-600 ... "
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