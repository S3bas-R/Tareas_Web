import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

function DetalleUsuario() {
  {/* PASO 1: Obtener el ID del usuario desde los parámetros de la URL */}
  const { id: userId } = useParams();
  
  {/* PASO 2: Estado para almacenar la información del usuario, sus posts, carga y error */}

  const { data: usuario, loading: cargandoUsuario, error: errorUsuario } = useFetch(`/api/users/${userId}`);
  
  const { data: posts, loading: cargandoPosts, error: errorPosts } = useFetch(`/api/posts?userId=${userId}`);
  const navigate = useNavigate();

  if (cargandoUsuario || cargandoPosts) {
    return (
      <div className="cargando">
        <div className="spinner"></div>
        <p>Cargando información del usuario...</p>
      </div>
    );
  }

  const error = errorUsuario || errorPosts;
  if (error) {
    return (
      <div className="error">
        <h2>❌ Error</h2>
        <p>{error}</p>
        <Link to="/usuarios">Volver a Usuarios</Link>
      </div>
    );
  }

  if (!usuario) {
    return <div className="error">Usuario no encontrado</div>;
  }

  return (
    <div className="detalle-usuario-container">
      {/* Enlace para volver a la lista de usuarios */}
      <Link to="/usuarios" className="volver-enlace">← Volver a Usuarios</Link>

      {/* Información del Usuario */}
      <div className="info-usuario">
        <h2>{usuario.name}</h2>
        <div className="datos-usuario">
          <p><strong>Username:</strong>{usuario.username}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Teléfono:</strong> {usuario.phone}</p>
          <p><strong>Sitio Web:</strong> {usuario.website}</p>
          <p><strong>Compañía:</strong> {usuario.company?.name || 'N/A'}</p>
          <p><strong>Dirección:</strong> {`${usuario.address?.street ?? ''}, ${usuario.address?.suite ?? ''}, ${usuario.address?.city ?? ''}, ${usuario.address?.zipcode ?? ''}`}</p>
        </div>
      </div>

      {/* Posts del Usuario */}
      <div className="posts-usuario">
        <h3>Posts de {usuario.name} ({posts.length})</h3>
        
        {posts.length === 0 ? (
          <p className="sin-posts">No hay posts disponibles.</p>
        ) : (
          <div className="posts-grid">
            {posts.map(post => (
              <div key={post.id} className="post-card">
                <h4>{post.title}</h4>
                <p>{post.body.substring(0, 150)}...</p>
                {/* Enlace al detalle del post */}
                <Link to={`/posts/${post.id}`}>Leer más</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DetalleUsuario;