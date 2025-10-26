import React from 'react';

// This is the component. It takes all the props (like className, id, type, etc.)
// and passes them directly to the HTML <input> element using {...props}.
const Input = ({ type = 'text', ...props }) => {
    return (
        <input
            type={type}
            {...props} // This is the key part!
        />
    );
};

// This is the default export that FormField.jsx is looking for.
export default Input;