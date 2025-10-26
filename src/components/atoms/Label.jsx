import React from 'react';

// This component takes 'children' (the text) and any other props
// (like htmlFor, className) and passes them to the HTML <label> tag.
const Label = ({ children, ...props }) => {
    return (
        <label {...props}>
            {children}
        </label>
    );
};

// This line provides the default export that FormField.jsx is looking for.
export default Label;