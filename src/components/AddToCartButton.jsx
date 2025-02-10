import React from "react";
import { addToCart } from "../lib/cart";

const AddToCartButton = ({ course }) => {
    const handleAddToCart = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          alert("Debes iniciar sesión para añadir cursos al carrito.");
          return;
        }
      
        const added = await addToCart(userId, course);
        
        if (!added) {
          return; // Si no se añade, no mostramos el mensaje
        }
      
        alert("Curso añadido al carrito!");
      };
      


  return (
    <button
      onClick={handleAddToCart}
      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
    >
      <img src="../anadir-a-la-cesta.png" alt="Añadir" className="w-5 h-5" />
    </button>
  );
};

export default AddToCartButton;
