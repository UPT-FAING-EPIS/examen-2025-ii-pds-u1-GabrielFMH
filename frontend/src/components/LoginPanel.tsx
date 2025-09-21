import React, { useState } from 'react';

interface LoginPanelProps {
  onLogin: (role: 'student' | 'tutor', studentData?: { name: string; dni: string }) => void;
}

const LoginPanel: React.FC<LoginPanelProps> = ({ onLogin }) => {
  const [role, setRole] = useState<'student' | 'tutor' | null>(null);
  const [name, setName] = useState('');
  const [dni, setDni] = useState('');

  const handleRoleSelect = (selectedRole: 'student' | 'tutor') => {
    setRole(selectedRole);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'student') {
      if (!name || !dni) {
        alert('Por favor ingresa tu nombre y DNI.');
        return;
      }
      onLogin('student', { name, dni });
    } else {
      onLogin('tutor');
    }
  };

  return (
    <div>
      <h1>Sistema de Gestión de Asistencia</h1>
      {!role ? (
        <div>
          <h2>Seleccionar Rol</h2>
          <button onClick={() => handleRoleSelect('student')}>Acceder como Estudiante</button>
          <button onClick={() => handleRoleSelect('tutor')}>Acceder como Tutor</button>
        </div>
      ) : role === 'student' ? (
        <form onSubmit={handleSubmit}>
          <h2>Registro de Estudiante</h2>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>DNI:</label>
            <input
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
            />
          </div>
          <button type="submit">Registrar Asistencia</button>
          <button type="button" onClick={() => setRole(null)}>Volver</button>
        </form>
      ) : (
        <div>
          <button onClick={handleSubmit}>Acceder como Tutor</button>
          <button onClick={() => setRole(null)}>Volver</button>
        </div>
      )}
    </div>
  );
};

export default LoginPanel;