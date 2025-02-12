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
  if (!userId || typeof userId !== "string") {
    console.error("Error: userId inválido", userId);
    return [];
  }

  const url = `${FIRESTORE_URL}/${userId}?key=${API_KEY}`;
  console.log("Obteniendo items del carrito para userId:", userId, "con URL:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Respuesta de Firestore:", JSON.stringify(data, null, 2));

    if (response.status === 404) {
      console.log("El carrito no existe, devolviendo array vacío.");
      return [];
    }

    if (!response.ok) {
      throw new Error(`Error en Firestore: ${data.error?.message || "Error desconocido"}`);
    }

    if (!data.fields || !data.fields.items) {
      console.log("No hay elementos en el carrito.");
      return [];
    }

    const cartItems = data.fields.items.arrayValue.values.map((doc: any) => ({
      id: doc.mapValue.fields.id?.stringValue || "",
      imagen: doc.mapValue.fields.imagen?.stringValue || "",
      titulo: doc.mapValue.fields.titulo?.stringValue || "Sin título",
      precio: doc.mapValue.fields.precio?.doubleValue || 0,
      instructor: doc.mapValue.fields.instructor?.stringValue || "Desconocido",
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
  const cartUrl = `${FIRESTORE_URL}/${userId}?key=${API_KEY}`;
  const response = await fetch(cartUrl);
  const cartData = await response.json();

  let existingItems = [];

  if (response.ok && cartData.fields?.items) {
    existingItems = cartData.fields.items.arrayValue.values || [];
    const alreadyInCart = existingItems.some(
      (item: any) => item.mapValue.fields.titulo.stringValue === course.titulo
    );

    if (alreadyInCart) {
      alert("¡Este curso ya está en tu carrito!");
      return false;
    }
  }

  existingItems.push({
    mapValue: {
      fields: {
        id: { stringValue: course.id },
        titulo: { stringValue: course.titulo },
        imagen: { stringValue: course.imagen },
        precio: { doubleValue: course.precio },
        instructor: { stringValue: course.instructor },
      },
    },
  });

  const updateResponse = await fetch(cartUrl, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: {
        items: { arrayValue: { values: existingItems } },
      },
    }),
  });

  if (!updateResponse.ok) {
    console.error("Error al añadir el curso al carrito.");
    return false;
  }

  return true;
};


// Eliminar un curso del carrito
export const removeFromCart = async (userId: string, courseId: string) => {
  const cartUrl = `${FIRESTORE_URL}/${userId}?key=${API_KEY}`;
  const response = await fetch(cartUrl);
  const cartData = await response.json();

  if (!response.ok || !cartData.fields?.items) {
    console.error("No se encontró el carrito.");
    return;
  }

  const updatedItems = cartData.fields.items.arrayValue.values.filter(
    (item: any) => item.mapValue.fields.id.stringValue !== courseId
  );

  const updateResponse = await fetch(cartUrl, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: {
        items: { arrayValue: { values: updatedItems } },
      },
    }),
  });

  if (!updateResponse.ok) {
    console.error("Error al eliminar el curso del carrito.");
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
  
  
