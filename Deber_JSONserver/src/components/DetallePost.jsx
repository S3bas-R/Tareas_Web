import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router";
import { useFetch } from '../hooks/useFetch';

function DetallePost() {
  // const [post, setPost] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  // const [cargando, setCargando] = useState(true);
  // const [error, setError] = useState(null);

  // PASO 6: Obtener el ID del post desde los parámetros de la URL
  // TODO: Usar useParams de react-router-dom
  // Obtenemos el ID del post desde la URL (ej. /posts/1 -> id=1)
  const { id: postId } = useParams();
  // Hook para poder navegar programáticamente a otras rutas
  const navigate = useNavigate();

  // Usamos nuestro hook personalizado para traer los datos del post
  const { data: post, loading: cargando, error } = useFetch(`/api/posts/${postId}`);


  // useEffect(() => {
  //   const cargarDetalles = async () => {
  //     try {
  //       setCargando(true);

  //       // PASO 7: Cargar el post
  //       // TODO: Fetch a https://jsonplaceholder.typicode.com/posts/{postId}
  //       const respuesta = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  //       if (!respuesta.ok) {
  //         throw new Error('Error al cargar el post');
  //       }
  //       const datosPost = await respuesta.json();
  //       setPost(datosPost);

  //       // PASO 8: Cargar el usuario del post
  //       // TODO: Fetch a https://jsonplaceholder.typicode.com/users/{post.userId}
  //       const respuestaUsuario = await fetch(`https://jsonplaceholder.typicode.com/users/${datosPost.userId}`);
  //       if (!respuestaUsuario.ok) {
  //         throw new Error('Error al cargar el usuario');
  //       }
  //       const datosUsuario = await respuestaUsuario.json();
  //       const usuario = {
  //         name: datosUsuario.name,
  //         email: datosUsuario.email
  //       }
  //       setUsuario(usuario);

  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setCargando(false);
  //     }
  //   };

  //   if (postId) {
  //     cargarDetalles();
  //   }
  // }, [postId]);

  if (cargando) {
    return (
      <div className="cargando">
        <div className="spinner"></div>
        <p>Cargando detalles...</p>
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

  // Función para borrar el post
  const handleEliminar = async () => {
    // Pedimos confirmación al usuario antes de borrar
    if (!window.confirm('¿Estás seguro de que deseas eliminar este post?')) {
      return;
    }

    try {
      setEliminando(true);
      // Hacemos la petición DELETE a la API
      const respuesta = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo eliminar el post');
      }

      console.log('Post eliminado:', postId);
      // Si todo sale bien, redirigimos a la página principal
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el post: ' + error.message);
    } finally {
      setEliminando(false);
    }
  };

  if (!post) {
    return <div className="error">Post no encontrado</div>;
  }

  return (
    <div className="detalle-container">
      {/* PASO 9: Agregar Link/botón para volver a la lista */}
      {/* <button className="boton-volver" href="/">← Volver a la lista</button> */}
      {/* Enlace para regresar al listado principal */}
      <Link to="/" className="boton-volver">← Volver a la lista</Link>

      <div className="detalle-post">
        <h2>{post.title}</h2>

        {usuario && (
          <div className="autor">
            <strong>Autor:</strong> {usuario.name} ({usuario.email})
          </div>
        )}

        <div className="contenido">
          <p>{post.body}</p>
        </div>

        <div className="acciones">
          {/* Botón (Link) para ir a la página de editar */}
          <Link to={`/posts/${postId}/edit`} className="btn-editar">
            ✏️ Editar
          </Link>
          {/* Botón para ejecutar la eliminación */}
          <button
            onClick={handleEliminar}
            className="btn-eliminar"
            disabled={eliminando}
          >
            {eliminando ? 'Eliminando...' : '🗑️ Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetallePost;
