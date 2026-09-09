import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import { deleteTask, getTasks, updateTask } from '../api/tasks';
import { getErrorMessage } from '../utils/errors';
import React from 'react';


function unwrapTasks(data) {
  if (Array.isArray(data)) return data;
  return data?.tasks || data?.data || [];
}

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [priority, setPriority] = useState('all');

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getTasks();
      setTasks(unwrapTasks(response.data));
    } catch (err) {
      setError(getErrorMessage(err, 'Could not load tasks.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const text = `${task.title || ''} ${task.description || ''}`.toLowerCase();
    const matchesQuery = text.includes(query.toLowerCase().trim());
    const matchesStatus = status === 'all' || task.status === status;
    const matchesPriority = priority === 'all' || task.priority === priority;
    return matchesQuery && matchesStatus && matchesPriority;
  }), [tasks, query, status, priority]);

  const completed = tasks.filter((task) => task.status === 'completed').length;
  const pending = tasks.length - completed;

  const handleToggle = async (task) => {
    const id = task._id || task.id;
    setBusyId(id);
    try {
      const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
      const response = await updateTask(id, { status: nextStatus });
      const updated = response.data?.task || response.data?.data || response.data;
      setTasks((current) => current.map((item) => ((item._id || item.id) === id ? (updated || { ...item, status: nextStatus }) : item)));
    } catch (err) {
      setError(getErrorMessage(err, 'Could not update the task.'));
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (task) => {
    const id = task._id || task.id;
    if (!window.confirm(`Delete “${task.title}”?`)) return;
    setBusyId(id);
    try {
      await deleteTask(id);
      setTasks((current) => current.filter((item) => (item._id || item.id) !== id));
    } catch (err) {
      setError(getErrorMessage(err, 'Could not delete the task.'));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="app-shell">
      <Navbar />
      <main className="container">
        <section className="hero-row">
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h1>Task dashboard</h1>
            <p className="muted">Create, prioritize and track your work.</p>
          </div>
          <Link to="/tasks/new" className="btn btn-primary">+ New task</Link>
        </section>

        <section className="stats-grid">
          <div className="stat-card"><span>Total tasks</span><strong>{tasks.length}</strong></div>
          <div className="stat-card"><span>Pending</span><strong>{pending}</strong></div>
          <div className="stat-card"><span>Completed</span><strong>{completed}</strong></div>
        </section>

        <section className="toolbar card">
          <input className="search-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tasks..." />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="all">All priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </section>

        {error && <div className="alert alert-error page-alert">{error}<button onClick={loadTasks}>Retry</button></div>}

        {loading ? (
          <div className="loading-wrap"><div className="spinner" /><p>Loading tasks...</p></div>
        ) : filteredTasks.length === 0 ? (
          <EmptyState searchActive={Boolean(query || status !== 'all' || priority !== 'all')} />
        ) : (
          <section className="task-grid">
            {filteredTasks.map((task) => <TaskCard key={task._id || task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} busy={busyId === (task._id || task.id)} />)}
          </section>
        )}
      </main>
    </div>
  );
}
