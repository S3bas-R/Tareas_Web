import { useState } from 'react';
import { Link } from 'react-router-dom';

/* La función CrearPost es un componente que permite crear nuevos posts */
function CrearPost() {
    /* Los estados son variables que se usan para almacenar datos que pueden cambiar */
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);

    /* La función handleSubmit es un manejador de eventos que se ejecuta cuando se envía el formulario */
    const handleSubmit = async (e) => {
        e.preventDefault();

        /* Validación simple para asegurarnos de que el usuario ingrese datos */
        if (!titulo.trim() || !contenido.trim()) {
            setError('Por favor completa todos los campos');
            return;
        }

        try {
            setEnviando(true);
            setError(null);
            /* La función fetch es una función que permite hacer peticiones HTTP */
            const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST', /* Indica que se está haciendo una petición POST */
                body: JSON.stringify({
                    title: titulo,
                    body: contenido,
                    userId: 1, /* Usuario hardcodeado como ejemplo */
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (!respuesta.ok) {
                throw new Error('Error al crear el post');
            }

            /* Limpiar campos y mostrar mensaje de éxito */
            setTitulo('');
            setContenido('');
            setMensaje('¡Post creado con éxito!');

        } catch (err) {
            /* Mostrar error */
            setError(err.message);
        } finally {
            /* Finalizar la petición */
            setEnviando(false);
        }
    };
    /* El return es lo que se muestra en la pantalla */
    return (
        <div className="crear-post-container">
            <h2>✍️ Crear Nuevo Post</h2>
            {/* Link es un componente de React Router que permite navegar entre rutas */}
            <Link to="/" className="boton-volver">← Volver al listado</Link>

            {mensaje && <div className="mensaje-exito">{mensaje}</div>}
            {/* Si hay un error, se muestra el mensaje de error */}
            {error && <div className="mensaje-error">{error}</div>}

            {/* Formulario para crear un nuevo post */}
            <form onSubmit={handleSubmit} className="formulario-post">
                {/* Etiqueta para el campo de título */}
                <div className="campo">
                    <label htmlFor="titulo">Título:</label>
                    <input
                        type="text"
                        id="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Ingresa el título del post"
                        disabled={enviando}
                    />
                </div>

                {/* Etiqueta para el campo de contenido */}
                <div className="campo">
                    <label htmlFor="contenido">Contenido:</label>
                    <textarea
                        id="contenido"
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        placeholder="Escribe el contenido del post..."
                        rows="5"
                        disabled={enviando}
                    />
                </div>

                {/* Botón para enviar el formulario */}
                <button
                    type="submit"
                    className="boton-enviar"
                    disabled={!titulo.trim() || !contenido.trim() || enviando}
                >
                    {enviando ? 'Enviando...' : 'Publicar Post'}
                </button>
            </form>
        </div>
    );
}

/* Exportar el componente */
export default CrearPost;
