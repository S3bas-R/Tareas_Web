# Respuestas_Rojas

## 1. Ventajas y Desventajas de JSON Server

**Ventajas:**
- **Rapidez:** Permite tener una API REST falsa funcionando en segundos.
- **Simplicidad:** No requiere escribir código de backend ni configurar bases de datos.
- **Ideal para pruebas:** Perfecto para prototipar frontend sin esperar al backend real.

**Desventajas:**
- **No es para producción:** No tiene seguridad, autenticación real ni rendimiento para muchos usuarios.
- **Datos volátiles/locales:** Los datos se guardan en un archivo JSON, lo cual no es escalable.
- **Lógica limitada:** No puedes implementar lógica de negocio compleja en el servidor.

**¿Cuándo usarlo?**
- En etapas de aprendizaje, prototipado rápido, demos o desarrollo inicial de frontend.

**¿Cuándo NO usarlo?**
- En una aplicación real, pública o que maneje datos sensibles.

## 2. El Hook useNavigate

**¿Para qué se utiliza?**
`useNavigate` se usa para navegar o redirigir al usuario a otra página de la aplicación desde el código JavaScript, por ejemplo, después de completar una acción como enviar un formulario.

**¿Por qué es un Hook y no una función simple?**
Es un hook porque necesita conectarse con el "contexto" interno de React Router. React Router mantiene el historial de navegación y el estado de la ruta actual dentro del árbol de componentes de React. Una función simple de JavaScript (fuera de un componente o hook) no tendría acceso a este contexto ni sabría cómo actualizar la vista de React correctamente.

## 3. Mejoras para Mantenibilidad y Experiencia de Usuario

**Mejoras sugeridas:**

1.  **Componentes Reutilizables:**
    - Crearía componentes genéricos para elementos comunes como `<Boton>`, `<Input>` o `<Tarjeta>`.
    - **Por qué:** Evita repetir estilos y HTML, haciendo el cambio de diseño más fácil en un solo lugar.

2.  **Manejo de Errores Global (Toast/Notificaciones):**
    - En lugar de usar `alert()`, implementaría un sistema de notificaciones visuales (Toasts) que aparezcan flotando suavemente.
    - **Por qué:** Mejora la experiencia visual y no interrumpe al usuario tanto como una alerta nativa.

3.  **Validación de Formularios:**
    - Usaría librerías como Formik o React Hook Form.
    - **Por qué:** Permite manejar errores de validación (email inválido, campo muy corto) de forma más sencilla y dar feedback inmediato al usuario mientras escribe.

4.  **Estilos Organizados:**
    - Usar CSS Modules o una librería como Tailwind/Styled Components.
    - **Por qué:** Evita que los estilos de un componente afecten a otro por error (conflictos de nombres de clases).
