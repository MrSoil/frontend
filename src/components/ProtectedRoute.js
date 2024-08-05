import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../home/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // or null, or any suitable loading indicator
  }

  if (!isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
