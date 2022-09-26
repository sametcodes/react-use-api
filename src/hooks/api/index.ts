import useQuery from './query';
import useMutation from './mutation';

export default {
    get: useQuery,
    post: useMutation.bind(this, 'POST'),
    put: useMutation.bind(this, 'PUT'),
    patch: useMutation.bind(this, 'PATCH'),
    delete: useMutation.bind(this, 'DELETE')
}