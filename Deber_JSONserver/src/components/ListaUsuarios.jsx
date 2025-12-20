import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

function ListaUsuarios() {
  {/* Estado para almacenar los usuarios, carga y error */}
  const { data: usuarios, loading, error } = useFetch('/api/users');

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error al cargar usuarios: {error}</p>;

  return (
    <div>
      <h2>👥 Lista de Usuarios</h2>
      <div className="usuarios-grid">
        {usuarios.map(usuario => (
          <div key={usuario.id} className="usuario-card">
            <h3>{usuario.name}</h3>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Username:</strong> @{usuario.username}</p>
            <Link to={`/usuarios/${usuario.id}`}>Ver Detalles</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaUsuarios;