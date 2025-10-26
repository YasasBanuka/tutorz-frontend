import React from 'react';
import Label from '../atoms/Label'; 
import Input from '../atoms/Input'; 
import ErrorMessage from '../atoms/ErrorMessage';


const FormField = ({ id, label, type = 'text', placeholder, error }) => (
    <div>
        {/* We use the Label atom */}
        <Label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </Label>
        
        {/* We use the Input atom */}
        <Input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
        
        {/* We use the ErrorMessage atom */}
        <ErrorMessage message={error} />
    </div>
);

export default FormField;