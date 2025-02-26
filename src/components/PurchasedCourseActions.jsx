import { useEffect, useState } from "react";
import usePurchasedCourses from "../hooks/usePurchasedCourses.jsx";
import AddToCartButton from "../components/AddToCartButton";
import VideoButton from "../components/VideoButton.jsx";

const PurchasedCourseActions = ({ course }) => {
  const [userId, setUserId] = useState(null);
  const purchasedCourses = usePurchasedCourses(userId);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    const element = document.querySelector('[data-userid]');
    const id = element?.getAttribute('data-userid');
    if (id) setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId || purchasedCourses.length === 0) return;

    console.log("Estado actual:", {
      courseId: course.id,
      purchasedCourses,
      userId
    });

    const isInPurchased = purchasedCourses.includes(course.id);
    console.log(`¿El curso ${course.id} está en la lista de comprados?:`, isInPurchased);
    
    setIsPurchased(isInPurchased);
  }, [purchasedCourses, course.id, userId]);

  return (
    <div className="flex justify-between items-center">
      <p className="price-display text-lg font-semibold text-gray-800" data-price={course.precio}>
        {course.precio}
      </p>
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
