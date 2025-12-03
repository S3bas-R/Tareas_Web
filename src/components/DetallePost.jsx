import { Link, useParams } from "react-router";
import { usePostDetail } from "../hooks/usePostsDetail";

function DetallePost() {
  const { id: postId } = useParams();
  const { post, user: usuario, loading: cargando, error } = usePostDetail(postId);

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
        <p>{error.message}</p>
      </div>
    );
  }

  if (!post) {
    return <div className="error">Post no encontrado</div>;
  }

  return (
    <div className="detalle-container">
      {/* PASO 9: Agregar Link/botón para volver a la lista */}
      {/* <button className="boton-volver" href="/">← Volver a la lista</button> */}
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
      </div>
    </div>
  );
}

export default DetallePost;
