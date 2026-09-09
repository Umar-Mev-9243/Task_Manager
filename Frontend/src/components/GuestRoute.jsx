import { useAuth } from '../context/AuthContext.jsx';
import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

export default function GuestRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="page-center"><div className="spinner" /></div>;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
