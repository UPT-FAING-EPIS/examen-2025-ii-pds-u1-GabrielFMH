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
      alert('Error al cargar cursos: ' + (error as Error).message);
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
      console.error('Error al crear curso:', error);
    }
  };

  const handleDeleteCourse = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este curso?')) {
      try {
        await coursesApi.delete(id);
        loadCourses();
      } catch (error) {
        console.error('Error al eliminar curso:', error);
        alert('Error al eliminar curso.');
      }
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="panel">
      <h2>Cursos</h2>
      <form onSubmit={handleCreateCourse} className="form">
        <input
          type="text"
          placeholder="Nombre del Curso"
          value={newCourse.name}
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
        />
        <button type="submit">Agregar Curso</button>
      </form>
      <ul className="list">
        {courses.map(course => (
          <li key={course.id}>
            <strong>{course.name}</strong>: {course.description}
            <button onClick={() => handleDeleteCourse(course.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesPanel;