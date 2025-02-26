import { useState } from "react";
import VideoDialog from "./VideoDialog";

const VideoButton = ({ courseId, videoUrl, temario }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsDialogOpen(true)} 
        className="bg-blue-600 text-white px-3 py-1 rounded-md"
      >
        Ver Contenido
      </button>

      {isDialogOpen && (
        <VideoDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          videoUrl={videoUrl}
          temario={temario}
        />
      )}
    </>
  );
};

export default VideoButton;
