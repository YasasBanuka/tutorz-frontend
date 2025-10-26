import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/templates/AuthLayout';
import RegisterForm from '../../components/organisms/RegisterForm';

export default function RegisterPage() {
    const navigate = useNavigate();

    // This function will be passed to the RegisterForm
    const handleSwitchToLogin = () => {
        navigate('/login'); // Tell the router to go to the login page
    };

    return (
        <AuthLayout>
            <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
        </AuthLayout>
    );
}