import React, { useState, useEffect } from 'react';
import { AttendanceReport } from '../types';
import { reportsApi } from '../services/api';

const ReportsPanel: React.FC = () => {
  const [reports, setReports] = useState<AttendanceReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const response = await reportsApi.getAttendanceReport();
      setReports(response.data);
    } catch (error) {
      console.error('Error al cargar reportes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="panel">
      <h2>Reportes de Asistencia</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Curso</th>
            <th>Estudiante</th>
            <th>Sesiones Totales</th>
            <th>Presente</th>
            <th>Ausente</th>
            <th>Tarde</th>
            <th>Porcentaje de Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td>{report.courseName}</td>
              <td>{report.studentName}</td>
              <td>{report.totalSessions}</td>
              <td>{report.presentCount}</td>
              <td>{report.absentCount}</td>
              <td>{report.lateCount}</td>
              <td>{report.attendancePercentage.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsPanel;