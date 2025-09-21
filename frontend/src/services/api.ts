import axios from 'axios';
import { Course, Session, Attendance, AttendanceReport, Student } from '../types';

const API_BASE_URL = 'http://localhost:5238/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const coursesApi = {
  getAll: () => api.get<Course[]>('/courses'),
  getById: (id: number) => api.get<Course>(`/courses/${id}`),
  create: (course: Omit<Course, 'id'>) => api.post<Course>('/courses', course),
  update: (id: number, course: Course) => api.put(`/courses/${id}`, course),
  delete: (id: number) => api.delete(`/courses/${id}`),
};

export const sessionsApi = {
  getAll: () => api.get<Session[]>('/sessions'),
  getById: (id: number) => api.get<Session>(`/sessions/${id}`),
  create: (session: Omit<Session, 'id'>) => api.post<Session>('/sessions', session),
  delete: (id: number) => api.delete(`/sessions/${id}`),
};

export const attendanceApi = {
  getByCourse: (courseId: number) => api.get<Attendance[]>(`/attendance?courseId=${courseId}`),
  getByStudent: (studentId: number) => api.get<Attendance[]>(`/attendance?studentId=${studentId}`),
  create: (attendance: Omit<Attendance, 'id' | 'recordedAt'>) => api.post<Attendance>('/attendance', attendance),
  update: (id: number, attendance: Attendance) => api.put(`/attendance/${id}`, attendance),
  register: (data: { name: string; dni: string; sessionId: number }) => api.post('/attendance/register', data),
};

export const studentsApi = {
  getAll: () => api.get<Student[]>('/students'),
  getById: (id: number) => api.get<Student>(`/students/${id}`),
  create: (student: Omit<Student, 'id'>) => api.post<Student>('/students', student),
  update: (id: number, student: Student) => api.put(`/students/${id}`, student),
  delete: (id: number) => api.delete(`/students/${id}`),
};

export const reportsApi = {
  getAttendanceReport: () => api.get<AttendanceReport[]>('/reports/attendance'),
};