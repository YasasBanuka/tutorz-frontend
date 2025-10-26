import React from 'react';

// This component takes 'children' (which will be your <option> tags)
// and passes them and all other props (...props) to the HTML <select> tag.
const Select = ({ children, ...props }) => {
    return (
        <select {...props}>
            {children}
        </select>
    );
};

// This line provides the default export that RegisterForm.jsx is looking for.
export default Select;