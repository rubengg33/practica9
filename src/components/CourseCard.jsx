
const CourseCard = ({ course }) => {
  return (
    <div className="rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <img
        src={course.imagen}
        alt={course.titulo}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{course.titulo}</h2>
        <p className="text-gray-600 text-sm mb-3">{course.descripcion_resumida}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">${course.precio}</span>
          <a href={`/course/${course.id}`}>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
              Ver Detalle
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

