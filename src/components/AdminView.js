import React, { useEffect, useState } from 'react';
import api from '../api';
import ReturnBook from './ReturnBook';

export default function AdminView() {
  const [form, setForm] = useState({ code: '', title: '', author: '', total_copies: 1 });
  const [summary, setSummary] = useState(null);
  const [issues, setIssues] = useState([]);

  const loadSummary = async () => {
    try {
      const res = await api.summary();
      setSummary(res.data);
    } catch (e) { console.error(e); }
  };
  const loadIssues = async () => {
    try { const res = await api.currentIssues(); setIssues(res.data); } catch (e) { console.error(e); }
  };
  useEffect(() => { loadSummary(); loadIssues(); }, []);

  const addBook = async (e) => {
    e.preventDefault();
    try {
      await api.addBook(form);
      alert('Book added');
      setForm({ code: '', title: '', author: '', total_copies: 1 });
      loadSummary();
      loadIssues();
    } catch (err) {
      alert(err?.response?.data?.error || 'Error');
    }
  };

  return (
    <div>
      <h2>Admin</h2>
      <form onSubmit={addBook} style={{ marginBottom: 16 }}>
        <div><input placeholder="Unique Code" value={form.code} onChange={e=>setForm({...form, code:e.target.value})} required /></div>
        <div><input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required /></div>
        <div><input placeholder="Author" value={form.author} onChange={e=>setForm({...form, author:e.target.value})} /></div>
        <div><input type="number" min="1" placeholder="Total Copies" value={form.total_copies} onChange={e=>setForm({...form, total_copies: Number(e.target.value)})} required /></div>
        <button type="submit">Add Book</button>
      </form>

      <h3>Library Summary</h3>
      {summary ? (<div>Total: {summary.total_books} — Available: {summary.available_books} — Issued: {summary.issued}</div>) : <div>Loading...</div>}

      <h3>Issued Books</h3>
      <table border="1" cellPadding={6}>
        <thead><tr><th>Issue ID</th><th>Title</th><th>Code</th><th>Student</th><th>Phone</th><th>Issue Date</th><th>Due Date</th></tr></thead>
        <tbody>
          {issues.map(i => (
            <tr key={i.issue_id}><td>{i.issue_id}</td><td>{i.title}</td><td>{i.code}</td><td>{i.name}</td><td>{i.phone}</td><td>{i.issue_date}</td><td>{i.due_date}</td></tr>
          ))}
        </tbody>
      </table>

      <ReturnBook onReturned={() => { loadSummary(); loadIssues(); }} />
    </div>
  );
}
