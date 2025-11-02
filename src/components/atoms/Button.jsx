import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'medium', 
    disabled = false, 
    onClick, 
    type = 'button',
    fullWidth = false,
    className = ''
}) => {
    const baseClass = 'atom-button';
    const classes = `${baseClass} ${baseClass}--${variant} ${baseClass}--${size} ${fullWidth ? `${baseClass}--full-width` : ''} ${className}`.trim();

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    fullWidth: PropTypes.bool,
    className: PropTypes.string
};

export default Button;