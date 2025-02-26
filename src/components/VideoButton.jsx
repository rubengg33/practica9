import { useState } from "react";
import VideoDialog from "./VideoDialog";

const VideoButton = ({ courseId, videoUrl, temario }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = () => {
    console.log("Opening dialog with:", { courseId, videoUrl, temario });
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <button 
        onClick={handleClick} 
        className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
      >
        Ver Contenido
      </button>

      <VideoDialog
        isOpen={isDialogOpen}
        onClose={handleClose}
        videoUrl={videoUrl}
        temario={Array.isArray(temario) ? temario : []}
      />
    </>
  );
};

export default VideoButton;
