import { useState, useEffect } from 'react';

// Hook personalizado para hacer peticiones a la API (fetch)
export const useFetch = (url) => {
  // Variables de estado para guardar: los datos, si está cargando y si hubo error
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect se ejecuta cuando la URL cambia
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Iniciamos la carga y limpiamos errores previos
        setLoading(true);
        setError(null);
        // Hacemos la petición al servidor (GET)
        const res = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        // Si la respuesta no es correcta (ej. 404, 500), lanzamos un error
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        // Convertimos la respuesta a formato JSON
        const result = await res.json();
        // Guardamos los datos recibidos
        setData(result);
      } catch (err) {
        // Si algo falla, guardamos el mensaje de error
        setError(err.message);
        setData(null);
      } finally {
        // Al terminar (éxito o fallo), desactivamos el estado de carga
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  // Retornamos los estados para que el componente los pueda usar
  return { data, loading, error };
};