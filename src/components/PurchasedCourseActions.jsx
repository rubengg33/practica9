import { useEffect, useState } from "react";
import usePurchasedCourses from "../hooks/usePurchasedCourses.jsx";
import AddToCartButton from "../components/AddToCartButton";
import VideoButton from "../components/VideoButton.jsx";

const PurchasedCourseActions = ({ course, userId }) => {
  const purchasedCourses = usePurchasedCourses(userId);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    console.log("Estado actual:", {
      courseId: course.id,
      purchasedCourses,
      userId
    });

    if (purchasedCourses.length === 0) return;

    const isInPurchased = purchasedCourses.includes(course.id);
    console.log(`¿El curso ${course.id} está en la lista de comprados?:`, isInPurchased);
    
    setIsPurchased(isInPurchased);
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
