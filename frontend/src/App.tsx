import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPanel from './components/LoginPanel';
import StudentAttendancePanel from './components/StudentAttendancePanel';
import StudentAttendanceView from './components/StudentAttendanceView';
import CoursesPanel from './components/CoursesPanel';
import SessionsPanel from './components/SessionsPanel';
import AttendancePanel from './components/AttendancePanel';
import ReportsPanel from './components/ReportsPanel';
import './App.css';

function TutorApp() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1>Sistema de Gestión de Asistencia</h1>
          <ul>
            <li><Link to="/courses">Cursos</Link></li>
            <li><Link to="/sessions">Sesiones</Link></li>
            <li><Link to="/attendance">Asistencia</Link></li>
            <li><Link to="/student-attendance">Asistencia por Estudiante</Link></li>
            <li><Link to="/reports">Reportes</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/courses" element={<CoursesPanel />} />
            <Route path="/sessions" element={<SessionsPanel />} />
            <Route path="/attendance" element={<AttendancePanel />} />
            <Route path="/student-attendance" element={<StudentAttendanceView />} />
            <Route path="/reports" element={<ReportsPanel />} />
            <Route path="/" element={<CoursesPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  const [role, setRole] = useState<'student' | 'tutor' | null>(null);
  const [studentData, setStudentData] = useState<{ name: string; dni: string } | null>(null);

  const handleLogin = (selectedRole: 'student' | 'tutor', data?: { name: string; dni: string }) => {
    setRole(selectedRole);
    if (data) setStudentData(data);
  };

  const handleBack = () => {
    setRole(null);
    setStudentData(null);
  };

  if (!role) {
    return <LoginPanel onLogin={handleLogin} />;
  }

  if (role === 'tutor') {
    return <TutorApp />;
  }

  if (role === 'student' && studentData) {
    return <StudentAttendancePanel studentData={studentData} onBack={handleBack} />;
  }

  return null;
}

export default App;
