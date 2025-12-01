import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
// 1. Import the new page you are about to create
import RegisterDetailsPage from '../pages/auth/RegisterDetailsPage'; 
// Import your dashboard page as well
// import DashboardPage from '../pages/dashboard/DashboardPage';
// import ProtectedRoute from './ProtectedRoute';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-details" element={<RegisterDetailsPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Example of your future dashboard route
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
