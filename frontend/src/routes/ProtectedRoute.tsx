import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  // 1. Si no hay sesión, redirigimos al login
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si hay sesión, verificamos el rol
  const userRole = authService.getRole();
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/app/feed" replace />;
  }

  // 3. Todo correcto, renderizamos la vista (children)
  return <>{children}</>;
};

export default ProtectedRoute;