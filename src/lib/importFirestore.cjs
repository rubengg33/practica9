const fetch = require("node-fetch");
const fs = require("fs");

// 🚀 Reemplaza con tu ID de Proyecto de Firebase
const PROJECT_ID = "practica9-32729";
const DATABASE_URL = "https://firestore.googleapis.com/v1/projects/practica9-32729/databases/(default)/documents";

// 🚀 Carga el JSON original
const rawData = fs.readFileSync("courses-firestore.json");
const jsonData = JSON.parse(rawData);

// 🚀 Función para convertir datos al formato Firestore
const formatForFirestore = (data) => {
  return {
    fields: Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (typeof value === "number") {
          if (Number.isInteger(value)) {
          return [key, { integerValue: value }];
        } else {
          return [key, { doubleValue: value }];
        }
        } else if (typeof value === "string") {
          return [key, { stringValue: value }];
        } else if (Array.isArray(value)) {
          return [key, { arrayValue: { values: value.map((item) => ({ stringValue: item })) } }];
        } else {
          return [key, { stringValue: JSON.stringify(value) }];
        }
      })
    )
  };
};

// 🚀 Enviar cada curso a Firestore
const uploadCourses = async () => {
  for (const key in jsonData.courses) {
 const course = jsonData.courses[key]; // Obtiene cada curso correctamente
  console.log(course); // Verifica que los datos son correctos
    const response = await fetch(`${DATABASE_URL}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formatForFirestore(course))
    });

    const data = await response.json();
    console.log("Curso agregado:", data);
  }
};

// 🚀 Enviar cada usuario a Firestore
const uploadUsers = async () => {
  for (const [userId, userData] of Object.entries(jsonData.users)) {
    const response = await fetch(`${DATABASE_URL}/users/${userId}`, {
      method: "PATCH", // PATCH porque queremos usar el ID del usuario
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formatForFirestore(userData))
    });

    const data = await response.json();
    console.log("Usuario agregado:", data);
  }
};

// 🚀 Ejecutar importación
uploadCourses().then(uploadUsers).then(() => console.log("Importación completada ✅"));
