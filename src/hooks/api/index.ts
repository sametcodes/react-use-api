import { useState } from 'react';

import useQuery from './query';
import useMutation from './mutation';

const defaultStore = {
    error: null,
    data: undefined,
    response: undefined,
    loading: true,
    variables: {}
};

const useAPI = (path: string) => {
    const [store, setStore] = useState(defaultStore)

    return {
        get: (variables: any = {}) => useQuery.bind(this, [store, setStore], path)(variables),
        post: useMutation.bind(this, [store, setStore], 'POST', path),
        put: useMutation.bind(this, [store, setStore], 'PUT', path),
        patch: useMutation.bind(this, [store, setStore], 'PATCH', path),
        delete: useMutation.bind(this, [store, setStore], 'DELETE', path)
    }
}

export default useAPI;