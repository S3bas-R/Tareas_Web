import { useState, useEffect } from 'react';
import { Link } from "react-router";

function ListaPosts() {
  // Estados para manejar la paginación, la lista de posts, la carga y errores
  const [pagina, setPagina] = useState(1);
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const limite = 4; // Cantidad de posts por página

  // Efecto que carga los posts cada vez que cambia la página
  useEffect(() => {
    const cargarPosts = async () => {
      try {
        // Iniciamos estado de carga
        setCargando(true);
        setError(null);

        // Construimos la URL con parámetros de paginación
        const url = `/api/posts?_page=${pagina}&_per_page=${limite}`;
        console.log('Cargando página:', pagina);

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
          throw new Error(`Error al cargar posts: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        // json-server devuelve los datos dentro de .data cuando se usa paginación
        const postsRecibidos = Array.isArray(datos) ? datos : (datos.data || []);

        setPosts(postsRecibidos);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
        setPosts([]);
      } finally {
        // Finalizamos estado de carga
        setCargando(false);
      }
    };

    cargarPosts();
  }, [pagina, limite]);

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

  return (
    <div>
      <h2>📝 Lista de Posts</h2>
      {/* Grid para mostrar las tarjetas de los posts */}
      <div className="posts-grid">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            {/* Enlace para ir al detalle del post */}
            <Link to={`/posts/${post.id}`} className="post-link">Ver Detalle</Link>
            <h3>{post.title}</h3>
            {/* Mostramos solo una parte del contenido */}
            <p>{post.body.substring(0, 100)}...</p>
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="paginacion">
        <button
          onClick={() => {
            console.log('Click en Anterior, página actual:', pagina);
            setPagina(p => {
              const nueva = Math.max(1, p - 1);
              console.log('Nueva página:', nueva);
              return nueva;
            });
          }}
          disabled={pagina === 1}
          className="btn-paginacion"
        >
          ← Anterior
        </button>
        <span className="pagina-actual">Página {pagina}</span>
        <button
          onClick={() => {
            console.log('Click en Siguiente, página actual:', pagina);
            setPagina(p => {
              const nueva = p + 1;
              console.log('Nueva página:', nueva);
              return nueva;
            });
          }}
          disabled={posts.length < limite}
          className="btn-paginacion"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

export default ListaPosts;
