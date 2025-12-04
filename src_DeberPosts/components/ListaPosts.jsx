import { useState, useEffect } from 'react';
import { Link } from "react-router";

function ListaPosts() {
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(1);
  const limite = 10;

  useEffect(() => {
    // PASO 4: Implementar la llamada a la API
    const cargarPosts = async () => {
      try {
        setCargando(true);
        // Hacer fetch a https://jsonplaceholder.typicode.com/posts
        // Hacer fetch a https://jsonplaceholder.typicode.com/posts
        const respuesta = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pagina}&_limit=${limite}`);
        if (!respuesta.ok) {
          throw new Error('Error al cargar los posts');
        }
        const datos = await respuesta.json();
        setPosts(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    // Lo siguiente es para que se cargue la lista de posts al iniciar la página
    cargarPosts();
  }, [pagina]);
  // El "prev" es el valor anterior
  // El "Math.max" es para que no se pueda ir a una página anterior a la 1
  const paginaSiguiente = () => setPagina(prev => prev + 1);
  const paginaAnterior = () => setPagina(prev => Math.max(prev - 1, 1));

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
      <div className="header-lista">
        <h2>📝 Lista de Posts</h2>
        <Link to="/crear" className="boton-crear">➕ Crear Nuevo Post</Link>
      </div>
      <div className="posts-grid">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            {/* PASO 5: Agregar Link de React Router para navegar al detalle */}
            <Link to={`/posts/${post.id}`} className="post-link">Ver Detalle</Link>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}...</p>
          </div>
        ))}
      </div>

      <div className="paginacion">
        <button
          onClick={paginaAnterior}
          disabled={pagina === 1}
          className="boton-paginacion"
        >
          Anterior
        </button>
        <span className="info-pagina">Página {pagina}</span>
        <button
          onClick={paginaSiguiente}
          className="boton-paginacion"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default ListaPosts;
