// Importamos los estilos y componentes necesarios para el enrutamiento
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import ListaPosts from './components/ListaPosts'
import DetallePost from './components/DetallePost'
import FormularioPost from './components/FormularioPost'
import ListaUsuarios from './components/ListaUsuarios'
import DetalleUsuario from './components/DetalleUsuario'

// Componente principal de la aplicación
function App() {
  return (
    <div className="App">
      <header>
        <h1>App de Posts</h1>
        <p>Aplicación para visualizar posts y sus detalles</p>

        {/* Navegación principal: Menú con enlaces a las secciones principales */}
        <nav className="menu-principal">
          {/* Enlaces de navegación */}
          <Link to="/">Posts</Link>
          <Link to="/usuarios">Usuarios</Link>
        </nav>
      </header>

      <main>
        {/* Aquí irá el contenido de la aplicación */}
        <p>[x] Paso 1: Instalar React Router</p>
        <p>[x] Paso 2: Crear componentes ListaPosts y DetallePost</p>
        <p>[x] Paso 3: Configurar rutas</p>
        <p>[x] Paso 4: Implementar consumo de API</p>
        <p>[x] Paso 5: Agregar paginación</p>
        <p>[x] Paso 6: Implementar edición (PUT) y eliminación (DELETE)</p>
        <Link to="/posts/new">Crear Nuevo Post</Link>
        {/* Definición de Rutas: Aquí decimos qué componente mostrar según la dirección URL */}
        <Routes>
          {/* Ruta principal: Muestra la lista de posts */}
          <Route path="/" element={<ListaPosts />} />
          {/* Ruta para ver el detalle de un post específico (el :id es variable) */}
          <Route path="/posts/:id" element={<DetallePost />} />
          {/* Ruta para crear un nuevo post */}
          <Route path="/posts/new" element={<FormularioPost />} />
          {/* Ruta para editar un post existente */}
          <Route path="/posts/:id/edit" element={<FormularioPost />} />

          {/* Rutas para usuarios */}
          <Route path="/usuarios" element={<ListaUsuarios />} />
          <Route path="/usuarios/:id" element={<DetalleUsuario />} />
        </Routes>

      </main>
    </div>
  )
}

export default App
