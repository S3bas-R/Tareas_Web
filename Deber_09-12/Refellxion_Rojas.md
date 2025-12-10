# Reflexión_Rojas
## 1. ¿Cómo mejoraría el `useFetch`?

El `useFetch` que tenemos cumple, pero es algo básico.

Para mejorarlo, yo le haría lo siguiente:

*   **AbortController (El botón de cancelar):** Imagina que el usuario tiene internet lento, le da click a "Ver Post" y se arrepiente y se va a otro lado. Nuestro fetch sigue ahí gastando datos. Si le metemos un `AbortController`, si el componente se desmonta, ¡pum! cancelamos la petición. Ahorramos recursos.
*   **Opciones Dinámicas (No solo GET):** Ahora mismo está muy pensado para traer datos. ¿Y si quiero guardar? Tendría que pasarle `method: 'POST'`, body, headers... Haría que el hook acepte un objeto de opciones para usarlo con cualquier cosa.
*   **Caché (Memoria de pez):** Si vuelvo a visitar un post que ya vi hace 10 segundos, ¿para qué pedirlo otra vez? Podríamos guardar los datos en una caché simple para que la carga sea instantánea. Estilo *React Query*.
*   **Reintentos Automáticos:** A veces el internet parpadea. Estaría genial que si falla, él solito pruebe un par de veces más antes de rendirse y mostrar el error.

## 2. Manejo del Estado en el Formulario

Y si nos preguntamos: **¿Cómo no volverse loco con 20 `useState` diferentes?**

Imaginemos que tenemos un formulario con Nombre, Apellido, Edad, Dirección, Email... Si hacemos:
```javascript
const [nombre, setNombre] = useState('');
const [apellido, setApellido] = useState('');
// ... y así hasta el infinito
```
Nos llenamos de código repetido y manejar los cambios va a ser un dolor de cabeza.

**La Solución Mágica: El Objeto Único**

Lo que hacemos es meter todo en un solo saco (un objeto):

```javascript
const [formData, setFormData] = useState({
  title: '',
  body: '',
  userId: 1
});
```

El truco maestro está en la función `handleChange`:

```javascript
const handleChange = (e) => {
  const { name, value } = e.target;
  // Copiamos lo que había (...prev) y solo cambiamos la llave que tiene el nombre del input
  setFormData(prev => ({ ...prev, [name]: value }));
};
```

**¿Por qué es genial?**
1.  **Escalabilidad:** Da igual si tenemos 3 campos o 50, la función `handleChange` NO cambia. Sirve para todos.
2.  **Limpieza:** El código queda mucho más ordenado.
3.  **Envío:** Cuando queramos enviar los datos, ya tenemos el objeto `formData` listo para mandarlo al servidor. No tenemos que andar recolectando variables sueltas.
