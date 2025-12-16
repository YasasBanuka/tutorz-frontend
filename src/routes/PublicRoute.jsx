import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // If user is logged in, do not allow access to Login/Register
  // Redirect them to Dashboard instead
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, return the child component (Login/Register)
  // If children is passed use it, otherwise use Outlet
  return children ? children : <Outlet />;
};

export default PublicRoute;