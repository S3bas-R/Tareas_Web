import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

function FormularioPost() {
  const navigate = useNavigate();
  // Obtenemos el ID de la URL. Si existe, estamos editando.
  const { id } = useParams();
  const isEditing = !!id; // Convertimos a booleano: true s hay ID, false si no

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos del post si estamos editando
  useEffect(() => {
    // Si estamos editando, cargamos los datos del post existente
    if (isEditing) {
      const cargarPost = async () => {
        try {
          setCargando(true);
          const respuesta = await fetch(`/api/posts/${id}`);
          if (!respuesta.ok) {
            throw new Error('Error al cargar el post');
          }
          const datos = await respuesta.json();
          // Llenamos el formulario con los datos recibidos
          setFormData({
            title: datos.title,
            body: datos.body,
            userId: datos.userId
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setCargando(false);
        }
      };
      cargarPost();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Función que maneja el envío del formulario (Crear o Actualizar)
  const manejarEnvio = async (e, shouldRedirect = true) => {
    e.preventDefault();

    // Determinamos la URL y el método HTTP según si estamos editando o creando
    const url = isEditing
      ? `/api/posts/${id}`
      : '/api/posts';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      setCargando(true);
      const respuesta = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!respuesta.ok) {
        throw new Error(`Error al ${isEditing ? 'actualizar' : 'crear'} el post`);
      }

      const datos = await respuesta.json();
      console.log(`Post ${isEditing ? 'actualizado' : 'creado'}:`, datos);

      // Lógica de redirección: volvemos al inicio o nos quedamos aquí
      if (shouldRedirect) {
        navigate('/');
      } else {
        alert('Post actualizado correctamente');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  const { data: usuarios, cargando: cargandoUsuarios, error: errorUsuarios } = useFetch('/api/users');

  if (cargando && isEditing) {
    return (
      <div className="cargando">
        <div className="spinner"></div>
        <p>Cargando post...</p>
      </div>
    );
  }

  return (
    <div className="formulario-container">
      <h2>{isEditing ? 'Editar Post' : 'Crear Nuevo Post'}</h2>

      {error && (
        <div className="error">
          <p>❌ {error}</p>
        </div>
      )}

      <form onSubmit={manejarEnvio} className="formulario-post">
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Contenido:</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="form-textarea"
            rows="5"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="userId">Usuario:</label>
          {/* <input
            type="number"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="form-input"
            min="1"
            required
          /> */}
          {cargandoUsuarios ? (
            <p>Cargando usuarios...</p>
          ) : errorUsuarios ? (
            <p>Error al cargar usuarios: {errorUsuarios}</p>
          ) : (
            <select
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Seleccione un usuario</option>
              {usuarios && usuarios.map(usuario => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="form-actions">
          {/* Si estamos en modo CREAR, mostramos un solo botón normal */}
          {!isEditing ? (
            <button
              type="submit"
              className="btn-primary"
              disabled={cargando}
            >
              {cargando ? 'Guardando...' : 'Crear'}
            </button>
          ) : (
            /* Si estamos en modo EDITAR, mostramos los dos botones solicitados */
            <>
              <button
                type="button"
                onClick={(e) => manejarEnvio(e, false)}
                className="btn-primary"
                disabled={cargando}
              >
                Actualizar y Continuar Editando
              </button>
              <button
                type="button"
                onClick={(e) => manejarEnvio(e, true)}
                className="btn-secondary"
                disabled={cargando}
                style={{ marginLeft: '10px' }}
              >
                Actualizar y Regresar a Listado
              </button>
            </>
          )}

          {!isEditing && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default FormularioPost;