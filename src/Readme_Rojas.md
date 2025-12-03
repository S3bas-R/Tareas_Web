## Reflexión sobre la Refactorización con Custom Hooks

En este ejercicio, hemos refactorizado la lógica de obtención de datos (data fetching) para moverla de los componentes a custom hooks.

### Cambios Realizados

1.  **`useFetch`**: Se mejoró el hook genérico para manejar casos donde la URL es `null`, permitiendo ejecuciones condicionales o dependientes.
2.  **`usePosts`**: Se creó un hook específico para obtener la lista de posts, encapsulando la URL y parámetros como el límite de resultados.
3.  **`usePostDetail`**: Se implementó un hook para obtener el detalle de un post. Este hook es interesante porque realiza dos peticiones secuenciales: primero obtiene el post y, usando el ID de usuario del post, obtiene los datos del autor.
4.  **Componentes**: Se limpiaron `ListaPosts` y `DetallePost`, eliminando los `useEffect` y estados locales relacionados con la carga de datos. Ahora los componentes son más declarativos y se enfocan en la presentación.

### Beneficios

-   **Reutilización**: La lógica de `fetch` está centralizada.
-   **Separación de Intereses**: Los componentes de vista no conocen los detalles de la API.
-   **Legibilidad**: El código de los componentes es mucho más limpio y fácil de leer.
-   **Mantenibilidad**: Si la API cambia, solo necesitamos actualizar los hooks.
