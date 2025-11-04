import React from 'react';
import './App.css';
import AdminView from './components/AdminView';
import StudentView from './components/StudentView';

function App() {
  const [mode, setMode] = React.useState('student');

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <h1>College Library</h1>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setMode('student')}>Student</button>
        <button onClick={() => setMode('admin')} style={{ marginLeft: 8 }}>Admin</button>
      </div>

      {mode === 'student' ? <StudentView /> : <AdminView />}
    </div>
  );
}

export default App;
