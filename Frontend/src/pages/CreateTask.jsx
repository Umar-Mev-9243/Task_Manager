import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import { createTask } from '../api/tasks.js';
import { getErrorMessage } from '../utils/errors';
import React from 'react';


export default function CreateTask() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setError('');
    try {
      await createTask(payload);
      navigate('/dashboard');
    } catch (err) {
      const message = getErrorMessage(err, 'Could not create task.');
      setError(message);
      throw new Error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-shell">
      <Navbar />
      <main className="container narrow">
        <Link to="/dashboard" className="back-link">← Back to dashboard</Link>
        <div className="page-heading"><div><p className="eyebrow">TASKS</p><h1>Create task</h1><p className="muted">Add a task with enough detail to act on it.</p></div></div>
        {error && <div className="alert alert-error page-alert">{error}</div>}
        <TaskForm onSubmit={handleSubmit} submitting={submitting} submitLabel="Create task" />
      </main>
    </div>
  );
}
