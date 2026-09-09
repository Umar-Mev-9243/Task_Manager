import { useAuth } from '../context/AuthContext.jsx';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import React from 'react';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="page-center"><div className="spinner" /></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}
