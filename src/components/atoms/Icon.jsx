import React from 'react';

// 1. Use 'import' syntax
// 2. Use relative paths with forward slashes
import googleSrc from '../../assets/Images/google-icon-logo-svgrepo-com.svg';
import appleSrc from '../../assets/Images/apple-black-logo-svgrepo-com.svg';

const Icon = ({ provider, className }) => {
  const icons = {
    google: <img src={googleSrc} alt="Google" className={className} />,
    apple: <img src={appleSrc} alt="Apple" className={className} />,
    eye: (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* ... (your eye SVG path) ... */}
      </svg>
    ),
    'eye-off': (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* ... (your eye-off SVG path) ... */}
      </svg>
    ),
  };
  return icons[provider] || null;
};

export default Icon;