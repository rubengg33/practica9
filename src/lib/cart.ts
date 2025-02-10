const FIRESTORE_URL = "https://firestore.googleapis.com/v1/projects/practica9-32729/databases/(default)/documents/carts";
const API_KEY = "AIzaSyAFZJ63l3c1xErKyYnzC12_EP1xkJCuW4Y";

interface Course {
  id: string;
  imagen: { stringValue: string };
  titulo: { stringValue: string };
  precio: { doubleValue: number };
  instructor: { stringValue: string };
}

export const getCartItems = async (userId: string) => {
    console.log("Obteniendo items del carrito para userId:", userId);
  
    try {
      const response = await fetch(`${FIRESTORE_URL}/${userId}/cart?key=${API_KEY}`);
      const data = await response.json();
      console.log("Respuesta de Firestore:", JSON.stringify(data, null, 2));
  
      if (!response.ok) {
        throw new Error(`Error en Firestore: ${data.error?.message || "Error desconocido"}`);
      }
  
      if (!data.documents) {
        console.log("No hay elementos en el carrito.");
        return [];
      }
  
      const cartItems = data.documents.map((doc: any) => ({
        id: doc.name.split("/").pop(),
        imagen: doc.fields.imagen?.stringValue || "", // Asegurar que haya un string
        titulo: doc.fields.titulo?.stringValue || "Sin título",
        precio: doc.fields.precio?.doubleValue || 0, // Asegurar que sea un número
        instructor: doc.fields.instructor?.stringValue || "Desconocido",
      }));
  
      console.log("Cursos en el carrito después del mapeo:", cartItems);
      return cartItems;
    } catch (error) {
      console.error("Error obteniendo el carrito:", error);
      return [];
    }
  };
  
  
// Agregar curso al carrito usando `PUT` para asignar el ID del curso como nombre del documento
export const addToCart = async (userId: string, course: any) => {
    const cartResponse = await fetch(`${FIRESTORE_URL}/${userId}/cart?key=${API_KEY}`);
    const cartData = await cartResponse.json();
  
    if (cartData.documents) {
      const alreadyInCart = cartData.documents.some((doc: any) => doc.fields.titulo?.stringValue === course.titulo);
      if (alreadyInCart) {
        alert("¡Este curso ya está en tu carrito!");
        return false; // Devuelve false si ya estaba en el carrito
      }
    }
  
    const response = await fetch(`${FIRESTORE_URL}/${userId}/cart?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          titulo: { stringValue: course.titulo },
          imagen: { stringValue: course.imagen },
          precio: { doubleValue: course.precio },
          instructor: { stringValue: course.instructor },
        },
      }),
    });
  
    if (!response.ok) {
      console.error("Error al añadir el curso al carrito.");
      return false;
    }
  
    return true; // Devuelve true si el curso se añadió con éxito
  };
  

  
  
  
  
  
  

// Eliminar un curso del carrito
export const removeFromCart = async (userId: string, courseId: string) => {
    try {
      console.log(`Eliminando curso con ID: ${courseId} del carrito de ${userId}`);
  
      const response = await fetch(`${FIRESTORE_URL}/${userId}/cart/${courseId}?key=${API_KEY}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Error al eliminar el curso del carrito");
      }
  
      console.log("Curso eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
    }
  };
  
  
  

// Finalizar compra
export const finalizePurchase = async (userId: string) => {
    try {
      const cartUrl = `${FIRESTORE_URL}/${userId}/items?key=${API_KEY}`;
      const response = await fetch(cartUrl);
      const data = await response.json();
  
      if (!data.documents) return;
  
      const purchasePromises = data.documents.map((doc: { name: string, fields: any }) => {
        const courseId = doc.name.split("/").pop() || "";
        const purchaseUrl = `https://firestore.googleapis.com/v1/projects/practica9-32729/databases/(default)/documents/purchases/${userId}/items?documentId=${courseId}&key=${API_KEY}`;
  
        return fetch(purchaseUrl, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fields: doc.fields }),
        });
      });
  
      await Promise.all(purchasePromises);
  
      // Ahora eliminamos los cursos del carrito después de comprarlos
      const deletePromises = data.documents.map((doc: { name: string }) =>
        fetch(`${FIRESTORE_URL}/${userId}/items/${doc.name.split("/").pop()}?key=${API_KEY}`, {
          method: "DELETE",
        })
      );
  
      await Promise.all(deletePromises);
  
      console.log("Compra finalizada correctamente");
    } catch (error) {
      console.error("Error finalizando compra: ", error);
    }
  };
  
  
