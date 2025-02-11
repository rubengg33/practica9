import React from "react";
import { Button } from "../components/ui/button";

const PurchaseDialog = ({ courses, total, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Confirmar compra</h2>
        <div className="space-y-2">
          {courses.map((course) => (
            <div key={course.id} className="flex justify-between">
              <span>{course.titulo}</span>
              <span>${course.precio.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 font-bold">
          <span>Total:</span>
          <span>${total}</span>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button className="bg-green-600 text-white" onClick={onConfirm}>
            Confirmar compra
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDialog;
