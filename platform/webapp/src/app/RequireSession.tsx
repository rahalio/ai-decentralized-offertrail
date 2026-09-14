import { Navigate, Outlet } from 'react-router-dom';
import { hasSession } from '@/shared/auth';

export function RequireSession() {
  if (!hasSession()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
