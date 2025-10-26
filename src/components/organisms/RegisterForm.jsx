import React from 'react';
import SocialLoginButton from '../molecules/SocialLogin/SocialLoginButton';
import FormField from '../molecules/FormField';
import PasswordInput from '../molecules/PasswordInput';
import Label from '../atoms/Label'; // Using atom
import Select from '../atoms/Select'; // Using atom

const RegisterForm = ({ onSwitchToLogin }) => (
     <div className="w-full">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">Create your account</h1>
        <div className="mt-6 space-y-4">
            <SocialLoginButton provider="google">Sign up with Google</SocialLoginButton>
            <SocialLoginButton provider="apple">Sign up with Apple</SocialLoginButton>
        </div>

        <div className="my-6 flex items-center">
            {/* ... (divider code) ... */}
        </div>

        <form className="space-y-4">
            <FormField id="email" label="Email" type="email" placeholder="you@example.com" error=""/>
            <PasswordInput id="password" label="Password" placeholder="••••••••" error=""/>
             <div>
                <Label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    I am a...
                </Label>
                <Select
                    id="role"
                    name="role"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                >
                    <option>Student/Parent</option>
                    <option>Tutor</option>
                    <option>Institute</option>
          _       </Select>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 ... "
            >
                Create Account
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

export default RegisterForm;