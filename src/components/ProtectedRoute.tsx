import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAllowed: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAllowed, children }) => {
  if (!isAllowed) {
    return <Navigate to="/user/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;