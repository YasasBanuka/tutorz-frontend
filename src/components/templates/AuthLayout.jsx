import React from 'react';
import Logo from '../atoms/Logo'; // Import your new atom

const AuthLayout = ({ children }) => (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md">
            <Logo />
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                {children}
            </div>
        </div>
    </div>
);

export default AuthLayout;