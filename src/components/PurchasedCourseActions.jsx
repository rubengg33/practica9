import { useEffect, useState } from "react";
import usePurchasedCourses from "../hooks/usePurchasedCourses.jsx";
import AddToCartButton from "../components/AddToCartButton";
import VideoButton from "../components/VideoButton.jsx";

const PurchasedCourseActions = ({ course, userId }) => {
  const purchasedCourses = usePurchasedCourses(userId);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    if (purchasedCourses.length === 0) return; // Evitar actualizar si aún no hay datos

    console.log("Cursos comprados:", purchasedCourses); // Debug
    console.log(`Verificando si ${course.id} está comprado...`);

    setIsPurchased(purchasedCourses.includes(course.id));

    console.log(`Resultado para ${course.id}:`, purchasedCourses.includes(course.id));
  }, [purchasedCourses, course.id]);

  return (
    <div className="flex justify-between items-center">
      <p className="text-lg font-semibold text-gray-800">${course.precio}</p>
      {isPurchased ? (
        <>
          <p className="text-green-600 font-bold">¡Curso comprado!</p>
          <VideoButton courseId={course.id} />
        </>
      ) : (
        <AddToCartButton course={course} />
      )}
    </div>
  );
};

export default PurchasedCourseActions;
