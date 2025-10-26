import React from 'react';
import Icon from '../../atoms/Icon';

const SocialLoginButton = ({ provider, children, ...props }) => {
    const providerStyles = {
        google: 'border-gray-300 hover:bg-gray-150',
        apple: 'border-gray-300 hover:bg-gray-150', 
    };

    return (
        <button 
            className={`w-full flex items-center justify-center gap-3 py-3 px-4 border rounded-lg transition-colors duration-200 ${providerStyles[provider]}`}
            {...props} 
        >
            <Icon provider={provider} className="w-6 h-6" />
            <span className="font-medium text-sm">{children}</span>
        </button>
    );
};

export default SocialLoginButton;