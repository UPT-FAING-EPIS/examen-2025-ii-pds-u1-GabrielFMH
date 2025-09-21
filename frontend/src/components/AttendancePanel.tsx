import React, { useState, useEffect } from 'react';
import { Attendance, Course, AttendanceStatus } from '../types';
import { attendanceApi, coursesApi } from '../services/api';

const AttendancePanel: React.FC = () => {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const coursesResponse = await coursesApi.getAll();
      setCourses(coursesResponse.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAttendance = async (courseId: number) => {
    try {
      const response = await attendanceApi.getByCourse(courseId);
      setAttendance(response.data);
    } catch (error) {
      console.error('Error al cargar asistencia:', error);
    }
  };

  const handleCourseChange = (courseId: number) => {
    setSelectedCourseId(courseId);
    loadAttendance(courseId);
  };

  const handleAttendanceChange = async (attendanceId: number, status: AttendanceStatus) => {
    try {
      const attendanceRecord = attendance.find(a => a.id === attendanceId);
      if (attendanceRecord) {
        await attendanceApi.update(attendanceId, { ...attendanceRecord, status });
        if (selectedCourseId) loadAttendance(selectedCourseId);
      }
    } catch (error) {
      console.error('Error al actualizar asistencia:', error);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="panel">
      <h2>Gestión de Asistencia</h2>
      <select onChange={(e) => handleCourseChange(parseInt(e.target.value))}>
        <option value="">Seleccionar Curso</option>
        {courses.map(course => (
          <option key={course.id} value={course.id}>{course.name}</option>
        ))}
      </select>
      {selectedCourseId && (
        <div>
          <h3>Registros de Asistencia</h3>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Sesión</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map(record => (
                <tr key={record.id}>
                  <td>{record.student?.name}</td>
                  <td>{record.session?.topic} ({new Date(record.session?.date || '').toLocaleDateString()})</td>
                  <td>{AttendanceStatus[record.status]}</td>
                  <td>
                    <select
                      value={record.status}
                      onChange={(e) => handleAttendanceChange(record.id, parseInt(e.target.value) as AttendanceStatus)}
                    >
                      <option value={AttendanceStatus.Present}>Presente</option>
                      <option value={AttendanceStatus.Absent}>Ausente</option>
                      <option value={AttendanceStatus.Late}>Tarde</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendancePanel;