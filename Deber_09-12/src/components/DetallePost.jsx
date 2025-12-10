import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router"; // Hooks de routing
import { useFetch } from '../hooks/useFetch'; // Hook personalizado fetch

function DetallePost() {
  // Obtención del ID desde la URL (ej: /posts/3 -> postId = 3)
  const { id: postId } = useParams();
  const navigate = useNavigate(); // Hook para navegación programática

  // Estado para controlar acción de eliminación
  const [eliminando, setEliminando] = useState(false);

  // 1. Fetch de los detalles del Post
  const { data: post, loading: cargando, error } = useFetch(`/api/posts/${postId}`);

  // 2. Fetch del Usuario (Autor) - Dependiente: Se ejecuta solo cuando 'post' existe
  const { data: usuario } = useFetch(post ? `/api/users/${post.userId}` : null);

  // Renderizado de carga
  if (cargando) {
    return (
      <div className="cargando">
        <div className="spinner"></div>
        <p>Cargando detalles...</p>
      </div>
    );
  }

  // Renderizado de error
  if (error) {
    return (
      <div className="error">
        <h2>❌ Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Manejador para eliminar el post
  const handleEliminar = async () => {
    // Confirmación simple del navegador
    if (!window.confirm('¿Estás seguro de que deseas eliminar este post?')) {
      return;
    }

    try {
      setEliminando(true);
      // Petición DELETE a la API
      const respuesta = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo eliminar el post');
      }

      console.log('Post eliminado:', postId);
      // Tras éxito, redirigimos al home (listado)
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el post: ' + error.message);
    } finally {
      setEliminando(false);
    }
  };

  // Validación final por si post es null (aunque useFetch maneja loading)
  if (!post) {
    return <div className="error">Post no encontrado</div>;
  }

  return (
    <div className="detalle-container">
      {/* Botón de retroceso al listado */}
      <Link to="/" className="boton-volver">← Volver a la lista</Link>

      <div className="detalle-post">
        <h2>{post.title}</h2>

        {/* Sección de Autor: Se muestra solo si 'usuario' ya cargó */}
        {usuario && (
          <div className="autor">
            <strong>Autor:</strong> {usuario.name} ({usuario.email})
          </div>
        )}

        <div className="contenido">
          <p>{post.body}</p>
        </div>

        {/* Acciones: Editar y Eliminar */}
        <div className="acciones">
          <Link to={`/posts/${postId}/edit`} className="btn-editar">
            ✏️ Editar
          </Link>
          <button
            onClick={handleEliminar}
            className="btn-eliminar"
            disabled={eliminando} // Deshabilitar mientras elimina para evitar doble click
          >
            {eliminando ? 'Eliminando...' : '🗑️ Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetallePost;
