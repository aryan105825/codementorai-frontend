import { Navigate } from 'react-router-dom';

import { ReactElement } from 'react';
const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
