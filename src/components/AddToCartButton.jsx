import React from "react";
import { addToCart } from "../lib/cart";

const AddToCartButton = ({ course }) => {
    const handleAddToCart = async () => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        
        if (!userId || !token) {
          alert("Debes iniciar sesión para añadir cursos al carrito.");
          return;
        }
      
        try {
          const added = await addToCart(userId, course);
          if (added === true) {
            alert("Curso añadido al carrito!");
          }
        } catch (error) {
          console.error("Error al añadir al carrito:", error);
        }
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
