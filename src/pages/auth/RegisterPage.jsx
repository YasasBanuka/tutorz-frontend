import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/templates/AuthLayout';
import RegisterForm from '../../components/organisms/RegisterForm';

export default function RegisterPage() {
    const navigate = useNavigate();

    const handleSwitchToLogin = () => {
        navigate('/login'); 
    };

    return (
        <AuthLayout>
            <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
        </AuthLayout>
    );
}