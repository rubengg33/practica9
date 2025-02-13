import { getCourses } from '../../src/lib/courses'; // Importa la función desde courses.ts

let currentIndex = 0;
let courses = [];

// Llamar a la función getCourses para obtener los cursos de la API
getCourses().then(data => {
  courses = data;  // Almacenar los cursos obtenidos
  updateSlider();  // Actualizar el slider con los cursos
}).catch(error => {
  console.error('Error al obtener los cursos:', error);
});

// Función para cambiar al siguiente curso
const goNext = () => {
  currentIndex = (currentIndex + 1) % courses.length;
  updateSlider();
};

// Función para cambiar al curso anterior
const goPrev = () => {
  currentIndex = (currentIndex - 1 + courses.length) % courses.length;
  updateSlider();
};

// Función para actualizar el contenido del slider
const updateSlider = () => {
  if (courses.length > 0) {
    const courseElement = document.getElementById('courseElement');
    const course = courses[currentIndex];
    courseElement.innerHTML = `
      <img class="w-full h-40 object-cover rounded-lg" src="${course.imagen}" alt="${course.titulo}" />
      <h2 class="mt-4 text-2xl font-semibold">${course.titulo}</h2>
      <p class="mt-2 text-sm text-gray-600">${course.descripcion_resumida}</p>
    `;
  }
};

// Asignar los eventos de clic a los botones
document.getElementById('prevButton').addEventListener('click', goPrev);
document.getElementById('nextButton').addEventListener('click', goNext);
