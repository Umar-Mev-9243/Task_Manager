import { Link } from 'react-router-dom';
import React from 'react';

export default function NotFound() {
  return (
    <main className="page-center">
      <div className="empty-state">
        <div className="empty-icon">?</div>
        <h1>Page not found</h1>
        <p>The page you requested doesn't exist.</p>
        <Link to="/dashboard" className="btn btn-primary">Go to dashboard</Link>
      </div>
    </main>
  );
}
