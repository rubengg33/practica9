import { useState, useEffect } from 'react';

const Like = ({ postId, initialLikes, onLikeUpdate }) => {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // Estado para controlar si los datos han sido cargados

  // Este efecto solo se ejecuta una vez cuando se monta el componente
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(
          `https://practica9-32729-default-rtdb.europe-west1.firebasedatabase.app/courses${postId}.json`
        );
        if (!response.ok) throw new Error('Error al obtener los likes de Firebase');

        const data = await response.json();
        if (data && data.likes !== undefined) {
          setLikes(data.likes);
        }
      } catch (error) {
        console.error('Error al obtener los likes:', error);
      } finally {
        setIsLoaded(true); // Marcar que los datos han sido cargados
      }
    };

    fetchLikes();
  }, [postId]);

  const handleLike = async () => {
    console.log('Click en botón Like para el post: ' + postId);
    setLoading(true);

    try {
      const response = await fetch(
        `https://practica9-32729-default-rtdb.europe-west1.firebasedatabase.app/courses/${postId}.json`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ likes: likes + 1 }),
        }
      );

      if (!response.ok) throw new Error('Error actualizando los likes en Firebase');

      const updatedData = await response.json();
      console.log('Datos actualizados:', updatedData);

      setLikes(updatedData.likes);

      if (onLikeUpdate) {
        onLikeUpdate(updatedData.likes);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Si los datos aún no han sido cargados, muestra un mensaje o un placeholder
  if (!isLoaded) {
    return (
      <button
        className="p-2 bg-blue-500 text-white rounded-lg opacity-50 cursor-not-allowed"
        disabled={true}
      >
        Cargando...
      </button>
    );
  }

  return (
    <button
      onClick={handleLike}
      className={`p-2 bg-blue-500 align- text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={loading}
    >
      👍 {likes} {loading && 'Cargando...'}
    </button>
  );
};

export default Like;
