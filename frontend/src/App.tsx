import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CoursesPanel from './components/CoursesPanel';
import SessionsPanel from './components/SessionsPanel';
import AttendancePanel from './components/AttendancePanel';
import ReportsPanel from './components/ReportsPanel';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1>Sistema de Gestión de Asistencia</h1>
          <ul>
            <li><Link to="/courses">Cursos</Link></li>
            <li><Link to="/sessions">Sesiones</Link></li>
            <li><Link to="/attendance">Asistencia</Link></li>
            <li><Link to="/reports">Reportes</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/courses" element={<CoursesPanel />} />
            <Route path="/sessions" element={<SessionsPanel />} />
            <Route path="/attendance" element={<AttendancePanel />} />
            <Route path="/reports" element={<ReportsPanel />} />
            <Route path="/" element={<CoursesPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
