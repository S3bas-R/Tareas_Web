import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

function FormularioPost() {
  // --- Hooks de Routing ---
  const navigate = useNavigate(); // Para redirigir tras guardar
  const { id } = useParams();     // Obtener ID si estamos en modo edición

  // Determinamos modo Edición si existe un 'id' en la URL
  const isEditing = !!id;

  // --- Estados del Formulario ---
  // Estado único para todos los campos (Manejo unificado)
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1
  });

  const [cargando, setCargando] = useState(false); // Spinner de carga
  const [error, setError] = useState(null);        // Manejo de errores

  // --- Efecto: Cargar datos para Edición ---
  useEffect(() => {
    if (isEditing) {
      const cargarPost = async () => {
        try {
          setCargando(true);
          // Fetch del post existente
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

  // --- Manejador de Cambios en Inputs ---
  // Actualiza el estado del formulario dinámicamente según el 'name' del input
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Spread operator (...prev) para mantener los otros campos intactos
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- Manejador de Envío (Submit) ---
  const manejarEnvio = async (e) => {
    e.preventDefault();

    // Identificar qué botón envió el formulario (por la propiedad 'name' del submitter)
    const action = e.nativeEvent.submitter ? e.nativeEvent.submitter.name : 'list';

    // Construcción de URL y Método según modo (Crear vs Editar)
    const url = isEditing
      ? `/api/posts/${id}`
      : '/api/posts'; // Endpoint base para crear

    const method = isEditing ? 'PUT' : 'POST';

    try {
      setCargando(true);
      const respuesta = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json' // Indicamos que enviamos JSON
        },
        body: JSON.stringify(formData) // Convertimos objeto JS a string JSON
      });

      if (!respuesta.ok) {
        throw new Error(`Error al ${isEditing ? 'actualizar' : 'crear'} el post`);
      }

      const datos = await respuesta.json();
      console.log(`Post ${isEditing ? 'actualizado' : 'creado'}:`, datos);

      // Lógica de Redirección según botón presionado
      if (action === 'continue') {
        // Botón 'Actualizar y Continuar': Solo avisamos
        alert('Post actualizado correctamente. Puedes seguir editando.');
      } else {
        // Botón 'Actualizar y Regresar' o Crear: Volvemos al listado
        navigate('/');
      }

    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  // --- Fetch de Usuarios para el Dropdown ---
  // Usamos useFetch para cargar la lista de usuarios elegibles
  const { data: usuarios, cargando: cargandoUsuarios, error: errorUsuarios } = useFetch('/api/users');

  // Renderizado de carga inicial (solo si editamos y estamos cargando el post)
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

      {/* Mensaje de Error global */}
      {error && (
        <div className="error">
          <p>❌ {error}</p>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={manejarEnvio} className="formulario-post">
        {/* Campo Título */}
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

        {/* Campo Cuerpo */}
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

        {/* Campo Usuario (Select Dinámico) */}
        <div className="form-group">
          <label htmlFor="userId">Usuario:</label>

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

        {/* Acciones (Botones) */}
        <div className="form-actions">
          {isEditing ? (
            // Botones específicos de Edición
            <>
              <button
                type="submit"
                name="continue" // Identificador para lógica de redirección
                className="btn-primary"
                disabled={cargando}
                style={{ marginRight: '10px' }}
              >
                {cargando ? 'Guardando...' : 'Actualizar y Continuar Editando'}
              </button>
              <button
                type="submit"
                name="return" // Identificador para lógica de redirección
                className="btn-primary"
                disabled={cargando}
              >
                {cargando ? 'Guardando...' : 'Actualizar y Regresar a Listado'}
              </button>
            </>
          ) : (
            // Botón único de Creación
            <button
              type="submit"
              className="btn-primary"
              disabled={cargando}
            >
              {cargando ? 'Guardando...' : 'Crear'}
            </button>
          )}

          {/* Botón Cancelar */}
          <button
            type="button"
            onClick={() => navigate(-1)} // Volver atrás en el historial
            className="btn-secondary"
            style={{ marginLeft: '10px' }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioPost;