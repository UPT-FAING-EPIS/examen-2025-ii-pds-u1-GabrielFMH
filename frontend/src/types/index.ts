export interface Course {
  id: number;
  name: string;
  description: string;
  instructorId: number;
}

export interface Student {
  id: number;
  name: string;
  email: string;
}

export interface Session {
  id: number;
  courseId: number; // camelCase
  date: string;     // camelCase
  topic: string;    // camelCase
  course?: Course; // Opcional, ya que es de navegación y se ignora en el envío
}


export interface Attendance {
  id: number;
  sessionId: number;
  studentId: number;
  status: AttendanceStatus;
  recordedAt: string;
  session?: Session;
  student?: Student;
}

export enum AttendanceStatus {
  Present = 0,
  Absent = 1,
  Late = 2
}

export interface AttendanceReport {
  courseId: number;
  courseName: string;
  studentId: number;
  studentName: string;
  totalSessions: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  attendancePercentage: number;
}