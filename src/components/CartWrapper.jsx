import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import { getCartItems } from "../lib/cart";

const CartWrapper = () => {
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Simulación de obtener el userId desde localStorage o algún otro lugar
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      getCartItems(storedUserId).then((data) => setCourses(data));
    }
  }, []);

  return <Cart courses={courses} userId={userId} />;
};

export default CartWrapper;
