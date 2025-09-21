import React, { useEffect, useState } from 'react';
import { sessionsApi, attendanceApi } from '../services/api';
import { Session } from '../types';

interface StudentAttendancePanelProps {
  studentData: { name: string; dni: string };
  onBack: () => void;
}

const StudentAttendancePanel: React.FC<StudentAttendancePanelProps> = ({ studentData, onBack }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await sessionsApi.getAll();
        setSessions(response.data);
      } catch (err) {
        setError('Error al cargar sesiones.');
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const handleRegisterAttendance = async (sessionId: number) => {
    try {
      await attendanceApi.register({ name: studentData.name, dni: studentData.dni, sessionId });
      alert('Asistencia registrada exitosamente.');
    } catch (err: any) {
      alert(err.response?.data || 'Error al registrar asistencia.');
    }
  };

  if (loading) return <p>Cargando sesiones...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Registro de Asistencia</h1>
      <p>Estudiante: {studentData.name} (DNI: {studentData.dni})</p>
      <h2>Sesiones Disponibles</h2>
      {sessions.length === 0 ? (
        <p>No hay sesiones disponibles.</p>
      ) : (
        <ul>
          {sessions.map((session) => (
            <li key={session.id}>
              <strong>{session.topic}</strong> - {session.date} - Curso: {session.course?.name || 'Desconocido'}
              <button onClick={() => handleRegisterAttendance(session.id)}>Registrar Asistencia</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onBack}>Volver</button>
    </div>
  );
};

export default StudentAttendancePanel;