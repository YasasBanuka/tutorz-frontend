import React, { useState } from 'react';
import Icon from '../atoms/Icon';
import Label from '../atoms/Label'; // Using atoms
import Input from '../atoms/Input'; // Using atoms
import ErrorMessage from '../atoms/ErrorMessage';

const PasswordInput = ({ id, label, placeholder, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <Label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </Label>
            <div className="relative">
                <Input
                    id={id}
                    name={id}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow ${error ? 'border-red-500' : 'border-gray-300'}`}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                >
                    <Icon provider={showPassword ? 'eye-off' : 'eye'} className="w-5 h-5" />
                </button>
            </div>
            <ErrorMessage message={error} />
        </div>
    );
};

export default PasswordInput;