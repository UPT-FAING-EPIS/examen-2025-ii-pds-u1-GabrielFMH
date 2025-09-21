import React, { useState, useEffect } from 'react';
import { Student, Attendance } from '../types';
import { studentsApi, attendanceApi } from '../services/api';

const StudentAttendanceView: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await studentsApi.getAll();
      setStudents(response.data);
    } catch (error) {
      console.error('Error al cargar estudiantes:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAttendance = async (studentId: number) => {
    try {
      const response = await attendanceApi.getByStudent(studentId);
      setAttendance(response.data);
    } catch (error) {
      console.error('Error al cargar asistencia:', error);
    }
  };

  const handleStudentChange = (studentId: number) => {
    setSelectedStudentId(studentId);
    loadAttendance(studentId);
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="panel">
      <h2>Asistencia por Estudiante</h2>
      <select onChange={(e) => handleStudentChange(parseInt(e.target.value))}>
        <option value="">Seleccionar Estudiante</option>
        {students.map(student => (
          <option key={student.id} value={student.id}>{student.name} (DNI: {student.dni})</option>
        ))}
      </select>
      {selectedStudentId && (
        <div>
          <h3>Registros de Asistencia</h3>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Sesión</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map(record => (
                <tr key={record.id}>
                  <td>{record.session?.topic}</td>
                  <td>{new Date(record.session?.date || '').toLocaleDateString()}</td>
                  <td>{record.status === 0 ? 'Presente' : record.status === 1 ? 'Ausente' : 'Tarde'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentAttendanceView;