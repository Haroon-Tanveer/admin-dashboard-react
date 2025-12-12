import { Navigate } from 'react-router-dom';
import { useAppContext } from '../store';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { state } = useAppContext();

  if (!state.auth.isAuthenticated) {
    return
    <>
    

    <Navigate to="/login" replace />;
    </>
  }

  return <>{children}</>;
};
