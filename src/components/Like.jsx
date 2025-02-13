import { useState, useEffect } from 'react';

const Like = ({ courseId, initialLikes, onLikeUpdate }) => {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const FIREBASE_PROJECT_ID = 'practica9-32729'; // Cambia esto por el ID de tu proyecto en Firebase
  const FIREBASE_API_KEY = 'AIzaSyAFZJ63l3c1xErKyYnzC12_EP1xkJCuW4Y'; // Opcional si tienes reglas públicas en Firestore
  const FIREBASE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/courses/${courseId}`;

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(FIREBASE_URL);
        if (!response.ok) throw new Error('Error al obtener los likes de Firestore');

        const data = await response.json();
        if (data.fields?.likes) {
          setLikes(data.fields.likes.integerValue ? parseInt(data.fields.likes.integerValue) : 0);
        }
      } catch (error) {
        console.error('Error al obtener los likes:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchLikes();
  }, [courseId]);

  const handleLike = async () => {
    setLoading(true);
    try {
      const newLikes = likes + 1;
  
      const response = await fetch(`${FIREBASE_URL}?updateMask.fieldPaths=likes`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            likes: { integerValue: newLikes.toString() }, // Convertir a string para evitar errores
          },
        }),
      });
  
      if (!response.ok) throw new Error('Error actualizando los likes en Firestore');
  
      setLikes(newLikes);
      if (onLikeUpdate) onLikeUpdate(newLikes);
    } catch (error) {
      console.error('Error al actualizar los likes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <button className="p-2 bg-blue-500 text-white rounded-lg opacity-50 cursor-not-allowed" disabled>
        Cargando...
      </button>
    );
  }

  return (
    <button
      onClick={handleLike}
      className={`p-2 bg-blue-500 text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={loading}
    >
      👍 {likes} {loading && 'Cargando...'}
    </button>
  );
};

export default Like;
