import { useState, useEffect } from 'react';
import { Link } from "react-router"; // Importamos Link para navegación SPA (Single Page Application)
import { useFetch } from '../hooks/useFetch'; // Hook personalizado para peticiones API

function ListaPosts() {
  // --- Definición de Estados ---
  const [pagina, setPagina] = useState(1);         // Controla la página actual de la lista
  const [posts, setPosts] = useState([]);          // Almacena el array de posts obtenidos
  const [cargando, setCargando] = useState(false);   // Indicador visual de carga
  const [error, setError] = useState(null);        // Almacena errores de la petición
  const limite = 4;                                // Constante: Cantidad de posts a mostrar por página

  /* Estado para el filtro de usuario seleccionado en el dropdown */
  const [filtroUsuario, setFiltroUsuario] = useState('');

  /* Hook para obtener la lista de usuarios usada en el filtro */
  const { data: usuarios } = useFetch('/api/users');

  // --- Efecto: Carga de Datos ---
  // Se dispara cuando cambia la 'pagina', el 'limite' o el 'filtroUsuario'
  useEffect(() => {
    const cargarPosts = async () => {
      try {
        setCargando(true); // Iniciamos spinner
        setError(null);    // Limpiamos errores previos

        // Construcción dinámica de los parámetros de la URL (Query String)
        const params = new URLSearchParams({
          _page: pagina,
          _per_page: limite
        });

        // Si hay un filtro de usuario activo, lo añadimos a los parámetros
        if (filtroUsuario) {
          params.append('userId', filtroUsuario);
        }

        const url = `/api/posts?${params.toString()}`;
        console.log('Fetching URL:', url); // Log para depuración

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
          throw new Error(`Error al cargar posts: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        // Normalización de respuesta: json-server puede devolver array directo u objeto con paginación
        const posts = Array.isArray(datos) ? datos : (datos.data || []);

        setPosts(posts); // Actualizamos estado
      } catch (err) {
        console.error('Error en fetch:', err);
        setError(err.message);
        setPosts([]);
      } finally {
        setCargando(false); // Finalizamos carga siempre
      }
    };

    cargarPosts();
  }, [pagina, limite, filtroUsuario]); // Dependencias del efecto

  // --- Renderizado de Estados de Carga y Error ---
  if (cargando) {
    return (
      <div className="cargando">
        <div className="spinner"></div>
        <p>Cargando posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>❌ Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  // --- Renderizado Principal ---
  return (
    <div>
      <h2>📝 Lista de Posts</h2>

      {/* Sección de Filtros */}
      <div className="filtro-container" style={{ marginBottom: '1rem' }}>
        <label htmlFor="filtro-usuario" style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>Filtrar por usuario:</label>
        <select
          id="filtro-usuario"
          value={filtroUsuario}
          onChange={(e) => {
            setFiltroUsuario(e.target.value);
            setPagina(1); // Importante: Volver a página 1 al filtrar para evitar listas vacías
          }}
          className="form-select"
        >
          <option value="">Todos los usuarios</option>
          {/* Mapeo de usuarios para generar opciones del select */}
          {usuarios && usuarios.map(usuario => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.name}
            </option>
          ))}
        </select>
      </div>

      {/* Grid de Posts */}
      <div className="posts-grid">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            {/* Link al detalle usando React Router */}
            <Link to={`/posts/${post.id}`} className="post-link">Ver Detalle</Link>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}...</p>
          </div>
        ))}
      </div>

      {/* Controles de Paginación */}
      <div className="paginacion">
        <button
          onClick={() => setPagina(p => Math.max(1, p - 1))} // Prevenir página < 1
          disabled={pagina === 1}
          className="btn-paginacion"
        >
          ← Anterior
        </button>

        <span className="pagina-actual">Página {pagina}</span>

        <button
          onClick={() => setPagina(p => p + 1)}
          disabled={posts.length < limite} // Deshabilitar si es último bloque de datos
          className="btn-paginacion"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

export default ListaPosts;
