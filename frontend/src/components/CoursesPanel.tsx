import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { coursesApi } from '../services/api';

const CoursesPanel: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCourse, setNewCourse] = useState({ name: '', description: '', instructorId: 1 });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await coursesApi.getAll();
      setCourses(response.data);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await coursesApi.create(newCourse);
      setNewCourse({ name: '', description: '', instructorId: 1 });
      loadCourses();
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="panel">
      <h2>Courses</h2>
      <form onSubmit={handleCreateCourse} className="form">
        <input
          type="text"
          placeholder="Course Name"
          value={newCourse.name}
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
        />
        <button type="submit">Add Course</button>
      </form>
      <ul className="list">
        {courses.map(course => (
          <li key={course.id}>
            <strong>{course.name}</strong>: {course.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesPanel;