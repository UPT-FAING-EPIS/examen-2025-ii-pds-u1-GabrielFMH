import React, { useState, useEffect } from 'react';
import { Session, Course } from '../types';
import { sessionsApi, coursesApi } from '../services/api';

const SessionsPanel: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSession, setNewSession] = useState({ courseId: 1, date: '', topic: '' });

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
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sessionsApi.create(newSession);
      setNewSession({ courseId: 1, date: '', topic: '' });
      loadData();
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="panel">
      <h2>Sessions</h2>
      <form onSubmit={handleCreateSession} className="form">
        <select
          value={newSession.courseId}
          onChange={(e) => setNewSession({ ...newSession, courseId: parseInt(e.target.value) })}
        >
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
        />
        <button type="submit">Create Session</button>
      </form>
      <ul className="list">
        {sessions.map(session => (
          <li key={session.id}>
            <strong>{session.course?.name}</strong> - {new Date(session.date).toLocaleString()} - {session.topic}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionsPanel;