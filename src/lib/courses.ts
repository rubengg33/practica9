const courses: any[] = [];

export const getCourses = async () => {
  if (courses.length) return courses;

  const response = await fetch(
    "https://practica9-32729-default-rtdb.europe-west1.firebasedatabase.app/courses.json"
  );
  const data = await response.json();

  if (!data || !data.courses) return []; // Evita errores si la clave "courses" no existe

  const items = data.courses; // Accedemos a la clave correcta del JSON

  courses.length = 0; // Limpiamos el array antes de agregar nuevos datos
  courses.push(...items);

  return courses;
};
