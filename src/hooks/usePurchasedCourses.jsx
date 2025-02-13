import { useState, useEffect } from "react";

const usePurchasedCourses = (userId) => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!userId) return;

      try {
        const res = await fetch(
          `https://firestore.googleapis.com/v1/projects/practica9-32729/databases/(default)/documents/purchases/${userId}`
        );
        const data = await res.json();
        console.log("Datos de purchases obtenidos:", data); // Debug

        const courses = data?.fields?.courses?.arrayValue?.values?.map((course) => course.stringValue) || [];
        
        setPurchasedCourses(courses);
      } catch (error) {
        console.error("Error obteniendo compras:", error);
      }
    };

    fetchPurchases();
  }, [userId]);

  return purchasedCourses;
};

export default usePurchasedCourses;
