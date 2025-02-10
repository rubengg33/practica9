const courses: any[] = [];

export const getCourses = async () => {
  if (courses.length) return courses;

  // 🔥 Nueva URL de Firestore en lugar de la Realtime Database
  const response = await fetch(
    "https://firestore.googleapis.com/v1/projects/practica9-32729/databases/(default)/documents/courses"
  );

  const data = await response.json();

  console.log("Respuesta de Firestore:", data); // 🔍 Verifica el formato recibido

  if (!data.documents) return []; // ✅ Verifica si hay documentos antes de continuar

  courses.length = 0; // 🔄 Limpia el array antes de llenarlo

  // 🔄 Transforma los documentos de Firestore a un array más fácil de usar
  courses.push(
    ...data.documents.map((doc: any) => ({
      id: doc.name.split("/").pop(), // 🔥 Extrae el ID del documento
      ...Object.fromEntries(
        Object.entries(doc.fields).map(([key, value]: any) => [
          key,
          Object.values(value)[0], // 🔄 Extrae el valor correcto
        ])
      ),
    }))
  );

  return courses;
};
