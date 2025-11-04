import React, { useState } from 'react';
import api from '../api';

export default function StudentView(){
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [form, setForm] = useState({ book_code: '', name: '', college: '', phone: '', due_date: '' });

  const search = async () => {
    try {
      const res = await api.getBooks(q);
      setResults(res.data);
    } catch (e) { console.error(e); }
  };

  const issue = async (e) => {
    e.preventDefault();
    try {
      await api.issueBook(form);
      alert('Book issued (if available)');
      setForm({ book_code: '', name: '', college: '', phone: '', due_date: '' });
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert('Not available. Next available: ' + (err.response.data.next_available || 'unknown'));
      } else {
        alert(err?.response?.data?.error || 'Error requesting book');
      }
    }
  };

  return (
    <div>
      <h2>Student</h2>
      <div style={{ marginBottom: 12 }}>
        <input placeholder="Search book title" value={q} onChange={e=>setQ(e.target.value)} />
        <button onClick={search}>Search</button>
      </div>

      <div>
        <h4>Results</h4>
        <ul>
          {results.map(b => <li key={b.id}>{b.title} — Code: {b.code} — Available: {b.available_copies}</li>)}
        </ul>
      </div>

      <h4>Request Issue</h4>
      <form onSubmit={issue}>
        <div><input placeholder="Book Code (from search)" value={form.book_code} onChange={e=>setForm({...form, book_code: e.target.value})} required /></div>
        <div><input placeholder="Your name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required /></div>
        <div><input placeholder="College" value={form.college} onChange={e=>setForm({...form, college: e.target.value})} /></div>
        <div><input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} required /></div>
        <div><input type="date" placeholder="Due date" value={form.due_date} onChange={e=>setForm({...form, due_date: e.target.value})} required /></div>
        <button type="submit">Request Book</button>
      </form>
    </div>
  );
}
