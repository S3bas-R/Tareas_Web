# Tarea: Integración de API y Creación de Posts

## Descripción de la Tarea
En esta actividad, hemos extendido la funcionalidad de nuestra aplicación de React para interactuar con una API externa (JSONPlaceholder). Las principales características implementadas son:

1.  **Listado de Posts con Paginación**: Se mejoró la visualización de posts implementando paginación para navegar entre diferentes conjuntos de datos, optimizando la carga y la experiencia del usuario.

2.  **Creación de Posts**: Se creó un formulario para enviar nuevos posts a la API utilizando el método HTTP `POST`.

3.  **Validación y Feedback**: Se implementaron validaciones para asegurar que los datos sean correctos antes del envío y se agregaron mensajes de éxito o error para informar al usuario sobre el estado de la operación.

4.  **Navegación**: Se mejoró la navegación dentro de la aplicación permitiendo volver fácilmente al listado principal.

## Reflexión sobre el uso de Endpoints
Los endpoints son los puntos de acceso que nos proporciona una API para interactuar con ella. Cada endpoint está asociado a una URL específica y a un método HTTP (GET, POST, PUT, DELETE, etc.) que define la acción a realizar.

En esta tarea, hemos utilizado varios endpoints de JSONPlaceholder:
-   `GET /posts`: Para obtener la lista de publicaciones. Hemos añadido parámetros como `_page` y `_limit` para controlar la paginación desde el servidor.
-   `GET /posts/:id`: Para obtener los detalles de una publicación específica.
-   `GET /users/:id`: Para obtener información del autor de la publicación.
-   `POST /posts`: Para enviar los datos de una nueva publicación.

El uso correcto de los endpoints nos permite mantener una separación clara entre el frontend (nuestra app React) y el backend (la API), facilitando el mantenimiento y la escalabilidad del software.

## ¿Qué es CORS y cómo se solventa?

**CORS** (Cross-Origin Resource Sharing o Intercambio de Recursos de Origen Cruzado) es una medida de seguridad que tienen los navegadores web.

Imagínalo como un guardia de seguridad en un edificio (el servidor).
-   Tu aplicación vive en una casa (por ejemplo, `http://localhost:5173`).
-   La API vive en otra casa (por ejemplo, `https://jsonplaceholder.typicode.com`).

Cuando tu aplicación intenta pedir datos a la API, el navegador (el guardia) dice: "¡Espera! Estás intentando pedir cosas a una casa diferente a la tuya. ¿Tienes permiso?".

Si el servidor de la API no dice explícitamente "Sí, permito que `localhost:5173` entre", el navegador bloqueará la petición para protegerte.

### ¿Cómo se solventa?
La solución principal viene del lado del **servidor** (la API). El servidor debe enviar unas cabeceras especiales en su respuesta (como una tarjeta de invitación) que digan:
-   `Access-Control-Allow-Origin: *` (Permito entrar a todo el mundo)
-   O `Access-Control-Allow-Origin: http://localhost:5173` (Permito entrar solo a esta app específica).

En nuestro caso, **JSONPlaceholder** ya está configurado para aceptar peticiones de cualquier origen, por lo que no tuvimos que hacer nada extra. Pero si estuvieras creando tu propia API, tendrías que configurar estas cabeceras en tu servidor (usando paquetes como `cors` en Node.js/Express) para permitir que tu frontend se comunique con ella.
