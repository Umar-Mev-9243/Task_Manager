import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import { getTask, updateTask } from '../api/tasks';
import { getErrorMessage } from '../utils/errors';
import React from 'react';

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    getTask(id)
      .then((response) => {
        if (!active) return;
        setTask(response.data?.task || response.data?.data || response.data);
      })
      .catch((err) => setError(getErrorMessage(err, 'Could not load task.')))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setError('');
    try {
      await updateTask(id, payload);
      navigate('/dashboard');
    } catch (err) {
      const message = getErrorMessage(err, 'Could not update task.');
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
        <div className="page-heading"><div><p className="eyebrow">TASKS</p><h1>Edit task</h1><p className="muted">Update the task and save your changes.</p></div></div>
        {error && <div className="alert alert-error page-alert">{error}</div>}
        {loading ? <div className="loading-wrap"><div className="spinner" /><p>Loading task...</p></div> : task ? <TaskForm initialValues={task} onSubmit={handleSubmit} submitting={submitting} submitLabel="Save changes" /> : <div className="empty-state"><h3>Task not found</h3><p>The task may have been deleted or you may not have access to it.</p></div>}
      </main>
    </div>
  );
}
