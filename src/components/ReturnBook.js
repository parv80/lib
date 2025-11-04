import React, { useState } from 'react';
import api from '../api';

export default function ReturnBook({ onReturned }) {
  const [form, setForm] = useState({ book_code: '', name: '', phone: '' });

  const handleReturn = async (e) => {
    e.preventDefault();
    try {
      const res = await api.returnBook(form);
      if (res.data && res.data.success) {
        alert('Book marked as returned successfully!');
        setForm({ book_code: '', name: '', phone: '' });
        if (typeof onReturned === 'function') onReturned();
      } else {
        alert(res.data?.message || 'Returned');
      }
    } catch (err) {
      alert(err?.response?.data?.error || 'Error while returning book');
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Return Book</h3>
      <form onSubmit={handleReturn}>
        <div><input placeholder="Book Code" value={form.book_code} onChange={e=>setForm({...form, book_code:e.target.value})} required /></div>
        <div><input placeholder="Student Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required /></div>
        <div><input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} required /></div>
        <button type="submit">Mark as Returned</button>
      </form>
    </div>
  );
}
