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
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="panel">
      <h2>Attendance Reports</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Student</th>
            <th>Total Sessions</th>
            <th>Present</th>
            <th>Absent</th>
            <th>Late</th>
            <th>Attendance %</th>
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