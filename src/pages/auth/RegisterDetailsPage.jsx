import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/templates/AuthLayout.jsx';
import FormField from '../../components/molecules/FormField.jsx';
import { ROLES } from '../../utils/constants'; 
import { validatePhoneNumber } from '../../utils/validators';
import { extractErrorMessage } from '../../utils/helpers';
import useAuth from '../../hooks/useAuth'; 

const RegisterDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();

  const stepOneData = location.state?.stepOneData;

  if (!stepOneData) {
    setTimeout(() => navigate('/register'), 0);
    return null;
  }

  // State
  const [formData, setFormData] = useState({
    phoneNumber: '',
    firstName: '',
    lastName: '',
    bio: '',
    bankAccount: '',
    bankName: '',
    school: '',
    grade: '',
    parentName: '',
    dateOfBirth: '', // This starts as an empty string
  });

  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState(null);

  // Generic Change Handler
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Clear specific field error when user types
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: null }));
    }
  };

  // Handle Phone Validation specifically
  const handlePhoneBlur = () => {
    const validation = validatePhoneNumber(formData.phoneNumber);
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, phoneNumber: validation.message }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setGlobalError(null);

    // Validate Phone
    const phoneValidation = validatePhoneNumber(formData.phoneNumber);
    if (!phoneValidation.isValid) {
        setErrors(prev => ({ ...prev, phoneNumber: phoneValidation.message }));
        return;
    }

    // Convert empty string to null before sending to backend
    const cleanDateOfBirth = formData.dateOfBirth === '' ? null : formData.dateOfBirth;

    // Prepare Data
    const fullRegistrationData = {
      ...stepOneData,
      ...formData, 
      // Map frontend fields to backend DTO names
      schoolName: formData.school,
      bankAccountNumber: formData.bankAccount,
      
      // Use the cleaned date variable
      dateOfBirth: cleanDateOfBirth,
      
      ExperienceYears: 0
    };

    // Call API via Custom Hook
    const result = await register(fullRegistrationData);

    if (result.success) {
      navigate('/dashboard'); // Or wherever you want to go after success
    } else {
      // Use helper to extract message
      setGlobalError(extractErrorMessage(result.error));
    }
  };

  const renderRoleFields = () => {
    switch (stepOneData.role) {
      case ROLES.TUTOR:
        return (
          <>
            <FormField id="firstName" label="First Name" value={formData.firstName} onChange={handleChange} required />
            <FormField id="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} required />
            <FormField id="bio" label="Bio" value={formData.bio} onChange={handleChange} />
            <FormField id="bankAccount" label="Bank Account" value={formData.bankAccount} onChange={handleChange} />
            <FormField id="bankName" label="Bank Name" value={formData.bankName} onChange={handleChange} />
          </>
        );
      case ROLES.STUDENT:
        return (
          <>
            <FormField id="firstName" label="First Name" value={formData.firstName} onChange={handleChange} required />
            <FormField id="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} required />
            <FormField id="school" label="School Name" value={formData.school} onChange={handleChange} />
            <FormField id="grade" label="Grade" value={formData.grade} onChange={handleChange} />
            <FormField id="parentName" label="Parent Name" value={formData.parentName} onChange={handleChange} />
            <FormField id="dateOfBirth" label="Date of Birth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">Tell us about yourself</h1>
        
        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <FormField
            id="phoneNumber"
            label={<>Phone Number <span className="text-red-500">*</span></>}
            type="tel"
            placeholder="0712345678"
            value={formData.phoneNumber}
            onChange={handleChange}
            onBlur={handlePhoneBlur} 
            error={errors.phoneNumber}
          />

          {renderRoleFields()}

          {globalError && (
            <p className="text-xs text-red-500 mt-1 text-center">{globalError}</p>
          )}
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Complete Registration
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default RegisterDetailsPage;