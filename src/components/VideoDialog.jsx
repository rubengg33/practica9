import React, { useRef, useEffect } from "react";
import { Button } from "../components/ui/button";

const VideoDialog = ({ isOpen, onClose, videoUrl, temario }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog) {
      dialog.showModal();
    } else if (dialog) {
      dialog.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  console.log("Dialog props:", { videoUrl, temario }); // Para debug

  return (
    <dialog 
      ref={dialogRef} 
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl backdrop:bg-black backdrop:bg-opacity-50"
      onClose={handleClose}
    >
      <h2 className="text-xl font-bold mb-4">Contenido del Curso</h2>
      <div className="mb-4 relative pt-[56.25%]">
        {videoUrl && (
          <iframe 
            className="absolute top-0 left-0 w-full h-full"
            src={videoUrl} 
            title="Video del curso" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className="text-sm text-gray-700">
        <h3 className="font-bold mb-2">Temario:</h3>
        <ul className="list-disc list-inside space-y-1">
          {temario?.map((tema, index) => (
            <li key={index}>{tema}</li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </div>
    </dialog>
  );
};

export default VideoDialog;
