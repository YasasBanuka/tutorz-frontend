import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
// 1. Import the new page you are about to create
import RegisterDetailsPage from '../pages/auth/RegisterDetailsPage'; 
// Import your dashboard page as well
// import DashboardPage from '../pages/dashboard/DashboardPage';
// import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* 2. Add the new route for step 2 of registration */}
        <Route path="/register-details" element={<RegisterDetailsPage />} />

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
