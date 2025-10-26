import React from 'react';
import Icon from '../../atoms/Icon'; // We import the atom

const SocialLoginButton = ({ provider, children }) => {
    const providerStyles = {
        google: 'border-gray-300 hover:bg-gray-50',
        apple: 'bg-black text-white hover:bg-gray-800',
    };

    return (
        <button className={`w-full flex items-center justify-center gap-3 py-3 px-4 border rounded-lg transition-colors duration-200 ${providerStyles[provider]}`}>
            <Icon provider={provider} className="w-6 h-6" />
            <span className="font-medium text-sm">{children}</span>
        </button>
    );
};

export default SocialLoginButton;