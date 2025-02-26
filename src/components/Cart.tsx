import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Trash2 } from "lucide-react";
import { removeFromCart, finalizePurchase, getCartItems } from "../lib/cart";
import PurchaseDialog from "../components/PurchaseDialog";

interface Course {
  id: string;
  imagen: string;
  titulo: string;
  precio: number;
  instructor: string;
}

const Cart = ({ userId }: { userId: string }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState('USD');

  useEffect(() => {
    console.log("userId recibido en Cart.tsx:", userId);
    const fetchCart = async () => {
      const items = await getCartItems(userId);
      setCourses(items);
    };

    fetchCart();
  }, [userId]);
  useEffect(() => {
    const handleCurrencyChange = (e: StorageEvent) => {
      if (e.key === 'currency') {
        setCurrentCurrency(e.newValue || 'USD');
      }
    };

    window.addEventListener('storage', handleCurrencyChange);
    setCurrentCurrency(localStorage.getItem('currency') || 'USD');

    return () => {
      window.removeEventListener('storage', handleCurrencyChange);
    };
  }, []);

  const convertPrice = (price: number) => {
    const rates = {
      EUR: 0.91,
      GBP: 0.79,
      USD: 1
    };
    const converted = price * rates[currentCurrency as keyof typeof rates];
    return converted.toFixed(2);
  };

  const handleRemove = async (courseId: string) => {
    await removeFromCart(userId, courseId);
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
  };

  const calculateTotal = () => {
    return convertPrice(courses.reduce((total, course) => total + course.precio, 0));
  };

  const handleConfirmPurchase = async () => {
    try {
      if (!userId) {
        alert("Debes iniciar sesión para comprar.");
        return;
      }

      for (const course of courses) {
        const purchaseUrl = `https://firestore.googleapis.com/v1/projects/practica9-32729/databases/(default)/documents/purchases/${userId}/courses/${course.id}`;
        
        await fetch(purchaseUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              purchaseDate: { timestampValue: new Date().toISOString() }
            }
          }),
        });
      }

      // Eliminar cursos del carrito
      for (const course of courses) {
        await removeFromCart(userId, course.id);
      }

      setCourses([]); 
      setIsDialogOpen(false);
      alert("¡Compra realizada con éxito! 🎉");
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      alert("Hubo un problema al procesar la compra. Inténtalo de nuevo.");
    }
  };
  

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">Carrito de Cursos</h2>
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={course.imagen} alt={course.titulo} className="w-12 h-12 object-cover rounded" />
              <div className="ml-4">
                <h3 className="font-semibold">{course.titulo}</h3>
                <p className="text-sm text-gray-500">{currentCurrency} {convertPrice(course.precio)}</p>
              </div>
            </div>
            <Button variant="destructive" size="icon" className="h-8 w-8 ml-2" onClick={() => handleRemove(course.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold">Total:</span>
        <span className="text-xl font-bold">{currentCurrency} {calculateTotal()}</span>
      </div>
      <Button className="text-white bg-green-600" onClick={() => setIsDialogOpen(true)}>
        Finalizar Compra
      </Button>

      {/* Dialog de Confirmación */}
      <PurchaseDialog
        courses={courses}
        total={calculateTotal()}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmPurchase}
        currency={currentCurrency}
      />
    </div>
  );
};

export default Cart;
