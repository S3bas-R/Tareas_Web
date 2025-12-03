import { useState, useEffect } from 'react';

// Este hook recibe una URL y devuelve los datos, si está cargando y si hubo error
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si no hay URL, no hacemos nada (o podríamos poner loading false)
    if (!url) {
      setLoading(true); // O false, depende de cómo queramos manejar el estado inicial "sin url"
      return;
    }

    // Reiniciamos el estado de carga al cambiar la URL
    setLoading(true);
    setError(null); // Limpiamos errores previos

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la petición');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [url]); // Se ejecuta cada vez que la URL cambia

  return { data, loading, error };
}