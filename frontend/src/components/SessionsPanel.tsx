// SessionsPanel.tsx
import React, { useState, useEffect } from 'react';
import { Session, Course } from '../types';
import { sessionsApi, coursesApi } from '../services/api';

const SessionsPanel: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  // Inicializar courseId con 0 para indicar que no se ha seleccionado
  const [newSession, setNewSession] = useState({ courseId: 0, date: '', topic: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [sessionsResponse, coursesResponse] = await Promise.all([
        sessionsApi.getAll(),
        coursesApi.getAll()
      ]);
      setSessions(sessionsResponse.data);
      setCourses(coursesResponse.data);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Error loading data: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica del lado del cliente
    if (newSession.courseId <= 0) {
        alert('Please select a valid course.');
        return;
    }
    if (!newSession.date) {
        alert('Please enter a date.');
        return;
    }

    try {
      // Crear el objeto con las claves en camelCase, tal como se definen en el tipo TypeScript
      const sessionToCreate = {
        courseId: newSession.courseId, // camelCase para coincidir con el tipo TypeScript
        date: new Date(newSession.date).toISOString(), // camelCase
        topic: newSession.topic // camelCase
      };

      console.log("Sending session data:", JSON.stringify(sessionToCreate, null, 2)); // Para depuración

      await sessionsApi.create(sessionToCreate);
      
      // Reiniciar el formulario
      setNewSession({ courseId: 0, date: '', topic: '' });
      
      loadData(); // Recargar datos
    } catch (error: any) { // Especificar 'any' para acceder a response
      console.error('Error creating session:', error);
      
      // Mejor manejo de errores
      let errorMsg = 'Error creating session.';
      if (error.response) {
        // El servidor respondió con un código de error
        errorMsg = error.response.data?.title || error.response.statusText || errorMsg;
        const validationErrors = error.response.data?.errors;
        if (validationErrors) {
          errorMsg += '\nDetails:\n';
          for (const [key, value] of Object.entries(validationErrors)) {
            errorMsg += ` - ${key}: ${(value as string[]).join(', ')}\n`;
          }
        }
      } else if (error.request) {
        // La solicitud fue hecha pero no hubo respuesta
        errorMsg = 'No response received from server.';
      } else {
        // Algo pasó al configurar la solicitud
        errorMsg = error.message || 'Unknown error.';
      }
      
      alert(errorMsg);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="panel">
      <h2>Sessions</h2>
      <form onSubmit={handleCreateSession} className="form">
        <select
          value={newSession.courseId}
          onChange={(e) => setNewSession({ ...newSession, courseId: parseInt(e.target.value, 10) })}
          required
        >
          <option value={0}>Select a course</option> {/* Opción por defecto */}
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.name}</option>
          ))}
        </select>
        <input
          type="datetime-local"
          value={newSession.date}
          onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Topic"
          value={newSession.topic}
          onChange={(e) => setNewSession({ ...newSession, topic: e.target.value })}
          required
        />
        <button type="submit">Create Session</button>
      </form>
      // SessionsPanel.tsx (parte del renderizado de la lista)
        <ul className="list">
          {sessions.map(session => {
            // Buscar el objeto Course correspondiente en el array 'courses' usando session.courseId
            const courseForSession = courses.find(course => course.id === session.courseId);
            return (
              <li key={session.id}>
                {/* Usar el nombre del curso encontrado */}
                <strong>{courseForSession ? courseForSession.name : 'Unknown Course'}</strong> - {new Date(session.date).toLocaleString()} - {session.topic}
              </li>
            );
          })}
        </ul>
    </div>
  );
};

export default SessionsPanel;