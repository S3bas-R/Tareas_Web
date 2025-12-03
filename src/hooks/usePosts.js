import { useFetch } from './useFetch';

export function usePosts() {
    // Simplemente usamos useFetch con la URL correcta
    // NOTA: Ajusta la URL si tu API es diferente a jsonplaceholder
    return useFetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
}