import CoursesJson from '../lib/courses.json';

export function getCourses() {
  return CoursesJson.courses; // Devuelve los posts del archivo JSON
}