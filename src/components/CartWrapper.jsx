import { useEffect, useState } from "react";
import Cart from "./Cart";
import { getCourses } from "../lib/courses";

const CartWrapper = () => {
  const [cartCourses, setCartCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getCourses();
      setCartCourses(courses.filter(course => course.purchased));
    };

    fetchCourses();
  }, []);

  return <Cart courses={cartCourses} />;
};

export default CartWrapper;
