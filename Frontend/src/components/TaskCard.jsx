import { Link } from 'react-router-dom';
import React from 'react';

const priorityClass = {
  low: 'badge-low',
  medium: 'badge-medium',
  high: 'badge-high',
};

export default function TaskCard({ task, onToggle, onDelete, busy }) {
  const isCompleted = task.status === 'completed';
  const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : null;

  return (
    <article className={`task-card ${isCompleted ? 'completed' : ''}`}>
      <div className="task-top">
        <button
          className={`check-button ${isCompleted ? 'checked' : ''}`}
          onClick={() => onToggle(task)}
          disabled={busy}
          aria-label={isCompleted ? 'Mark pending' : 'Mark completed'}
          title={isCompleted ? 'Mark pending' : 'Mark completed'}
        >
          {isCompleted ? '✓' : ''}
        </button>
        <div className="task-main">
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
        </div>
        <span className={`badge ${priorityClass[task.priority] || 'badge-medium'}`}>{task.priority || 'medium'}</span>
      </div>

      <div className="task-meta">
        <span className={`status ${isCompleted ? 'status-done' : 'status-pending'}`}>
          {isCompleted ? 'Completed' : 'Pending'}
        </span>
        {dueDate && <span>Due {dueDate}</span>}
      </div>

      <div className="task-actions">
        <Link to={`/tasks/${task._id || task.id}/edit`} className="btn btn-small btn-secondary">Edit</Link>
        <button className="btn btn-small btn-danger" onClick={() => onDelete(task)} disabled={busy}>Delete</button>
      </div>
    </article>
  );
}
