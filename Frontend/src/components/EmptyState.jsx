import { Link } from 'react-router-dom';
import React from 'react';

export default function EmptyState({ searchActive }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">✓</div>
      <h3>{searchActive ? 'No matching tasks' : 'No tasks yet'}</h3>
      <p>{searchActive ? 'Try changing your search or filter.' : 'Create your first task and start tracking your work.'}</p>
      {!searchActive && <Link to="/tasks/new" className="btn btn-primary">Create your first task</Link>}
    </div>
  );
}
