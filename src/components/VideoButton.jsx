import { useState, useEffect } from "react";
import VideoDialog from "./VideoDialog";

const VideoButton = ({ courseId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    fetch(`https://firestore.googleapis.com/v1/projects/practica9-32729/databases/(default)/documents/courses/${courseId}`)
      .then(res => res.json())
      .then(data => {
        if (data?.fields) {
          setCourseData({
            video: data.fields.video?.stringValue || "",
            temario: data.fields.temario?.arrayValue?.values?.map(v => v.stringValue) || []
          });
        }
      })
      .catch(error => console.error("Error obteniendo curso:", error));
  }, [courseId]);

  return (
    <>
      <button 
        onClick={() => setIsDialogOpen(true)} 
        className="bg-blue-600 text-white px-3 py-1 rounded-md"
      >
        Ver Contenido
      </button>
      {isDialogOpen && courseData && (
        <VideoDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          videoUrl={courseData.video}
          temario={courseData.temario}
        />
      )}
    </>
  );
};

export default VideoButton;
