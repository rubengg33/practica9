import { useState, useEffect } from "react";

const usePurchasedCourses = (userId) => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    if (!userId) {
      setPurchasedCourses([]);
      return;
    }

    const fetchPurchases = async () => {
      try {
        const res = await fetch(
          `https://firestore.googleapis.com/v1/projects/practica9-32729/databases/(default)/documents/purchases/${userId}/courses`
        );
        const data = await res.json();
        
        if (!data.documents) {
          setPurchasedCourses([]);
          return;
        }

        const courses = data.documents.map(doc => {
          const courseId = doc.name.split('/').pop();
          return courseId;
        });
        
        setPurchasedCourses(courses);
      } catch (error) {
        console.error("Error obteniendo compras:", error);
        setPurchasedCourses([]);
      }
    };

    fetchPurchases();
  }, [userId]);

  return purchasedCourses;
};

export default usePurchasedCourses;
