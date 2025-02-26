import { useState, useEffect } from "react";

const usePurchasedCourses = (userId) => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!userId) return;

      try {
        const res = await fetch(
          `https://firestore.googleapis.com/v1/projects/practica9-32729/databases/(default)/documents/purchases/${userId}/courses`
        );
        const data = await res.json();
        console.log("Datos crudos de Firestore:", data);
        
        if (!data.documents) {
          setPurchasedCourses([]);
          return;
        }

        // Extraer solo los IDs de los documentos
        const courses = data.documents.map(doc => {
          const fullPath = doc.name;
          const courseId = fullPath.split('/').pop();
          console.log("Procesando documento:", fullPath, "-> ID extraído:", courseId);
          return courseId;
        });
        
        setPurchasedCourses(courses);
        console.log("IDs finales de cursos comprados:", courses);
      } catch (error) {
        console.error("Error obteniendo compras:", error);
      }
    };

    fetchPurchases();
  }, [userId]);

  return purchasedCourses;
};

export default usePurchasedCourses;
