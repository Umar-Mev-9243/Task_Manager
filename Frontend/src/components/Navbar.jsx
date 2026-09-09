import { useAuth } from '../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    
    navigate('/login', { replace: true });

  };

  return (
    <header className="navbar">
      <Link to="/dashboard" className="brand"><span className="brand-dot" />TaskFlow</Link>
      <div className="nav-right">
        <span className="user-name">{user?.name || user?.email || 'User'}</span>
        <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}
