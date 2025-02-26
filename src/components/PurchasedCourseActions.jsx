import { useEffect, useState } from "react";
import usePurchasedCourses from "../hooks/usePurchasedCourses.jsx";
import AddToCartButton from "../components/AddToCartButton";
import VideoButton from "../components/VideoButton.jsx";

const PurchasedCourseActions = ({ course }) => {
  const [userId, setUserId] = useState(null);
  const purchasedCourses = usePurchasedCourses(userId);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem("token");
      const currentUserId = localStorage.getItem("userId");
      
      if (!token || !currentUserId) {
        setUserId(null);
        setIsPurchased(false);
        return;
      }
      
      setUserId(currentUserId);
    };

    checkSession();

    const interval = setInterval(checkSession, 1000);

    return () => {
      clearInterval(interval);
      setUserId(null);
      setIsPurchased(false);
    };
  }, []);

  useEffect(() => {
    if (!userId || !purchasedCourses) {
      setIsPurchased(false);
      return;
    }

    const isInPurchased = purchasedCourses.includes(course.id);
    setIsPurchased(isInPurchased);
  }, [purchasedCourses, course.id, userId]);

  const videoUrl = course.videoUrl;
  const temario = course.temario?.values?.map(item => item.stringValue) || [];

  return (
    <div className="flex justify-between items-center">
      <p className="price-display text-lg font-semibold text-gray-800" data-price={course.precio}>
        {course.precio}
      </p>
      {isPurchased && userId ? (
        <>
          <p className="text-green-600 font-bold">¡Curso comprado!</p>
          <VideoButton 
            courseId={course.id} 
            videoUrl={videoUrl} 
            temario={temario} 
          />
        </>
      ) : (
        <AddToCartButton course={course} />
      )}
    </div>
  );
};

export default PurchasedCourseActions;
