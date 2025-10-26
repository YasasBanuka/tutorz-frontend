import React from 'react';

import googleSrc from '../../assets/Images/google-icon-logo-svgrepo-com.svg';
import appleSrc from '../../assets/Images/apple-black-logo-svgrepo-com.svg';
import eyeOpen from '../../assets/Images/eye-svgrepo-com.svg';
import eyeClosed from '../../assets/Images/eye-closed-svgrepo-com.svg'; 

const Icon = ({ provider, className }) => {
  const icons = {
    google: <img src={googleSrc} alt="Google" className={className} />,
    apple: <img src={appleSrc} alt="Apple" className={className} />,
    eye: <img src={eyeOpen} alt="Show Password" className={className} />,
    'eye-off': <img src={eyeClosed} alt="Hide Password" className={className} />, 
  };
  return icons[provider] || null;
};

export default Icon;