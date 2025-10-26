import React from 'react';

const Input = ({ type = 'text', ...props }) => {
    return (
        <input
            type={type}
            {...props}
        />
    );
};

export default Input;