import { useEffect, useState } from 'react';
import React from 'react';

const initialForm = {
  title: '',
  description: '',
  priority: 'medium',
  status: 'pending',
  dueDate: '',
};

export default function TaskForm({ initialValues = initialForm, onSubmit, submitting, submitLabel = 'Create Task' }) {
  const [form, setForm] = useState({ ...initialForm, ...initialValues });
  const [error, setError] = useState('');

  useEffect(() => {
    setForm({ ...initialForm, ...initialValues });
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!form.title.trim()) {
      setError('Task title is required.');
      return;
    }
    try {
      await onSubmit({
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        dueDate: form.dueDate || null,
      });
    } catch (err) {
      setError(err.message || 'Unable to save task.');
    }
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Learn Express middleware" maxLength={120} required />
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="What do you need to accomplish?" rows="5" maxLength={1000} />
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={form.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="dueDate">Due date</label>
          <input id="dueDate" name="dueDate" type="date" value={form.dueDate ? form.dueDate.slice(0, 10) : ''} onChange={handleChange} />
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
