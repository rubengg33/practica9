import React, { useRef, useEffect } from "react";
import { Button } from "../components/ui/button";

const VideoDialog = ({ isOpen, onClose, videoUrl, temario }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Contenido del Curso</h2>
      <div className="mb-4">
      <iframe width="560" height="315" src={videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      <div className="text-sm text-gray-700">
        <h3 className="font-bold mb-2">Temario:</h3>
        <ul className="list-disc list-inside space-y-1">
          {temario.map((tema, index) => (
            <li key={index}>{tema}</li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </dialog>
  );
};

export default VideoDialog;
