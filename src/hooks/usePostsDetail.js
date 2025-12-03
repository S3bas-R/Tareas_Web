import { useFetch } from './useFetch';

export function usePostDetail(id) {
    // 1. Cargar el post
    const { data: post, loading: postLoading, error: postError } = useFetch(id ? `https://jsonplaceholder.typicode.com/posts/${id}` : null);

    // 2. Cargar el usuario (solo si tenemos el post)
    // Si post es null, pasamos null a useFetch y no hace nada
    const { data: user, loading: userLoading, error: userError } = useFetch(post ? `https://jsonplaceholder.typicode.com/users/${post.userId}` : null);

    return {
        post,
        user,
        loading: postLoading || userLoading,
        error: postError || userError
    };
}