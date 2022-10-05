import { useState } from 'react';

import useQuery from './query';
import useMutation from './mutation';

const defaultStore = {
    error: null,
    data: undefined,
    response: {
        GET: undefined,
        POST: undefined,
        PUT: undefined,
        PATCH: undefined,
        DELETE: undefined
    },
    loading: true,
    variables: {}
};

const useAPI = (path: string) => {
    const [store, setStore] = useState(defaultStore)

    return {
        get: (variables: any = {}) => useQuery.bind(this, [store, setStore], path)(variables),
        post: (customPath?: string) => useMutation.bind(this, [store, setStore], 'POST', customPath || path)(),
        put: (customPath?: string) => useMutation.bind(this, [store, setStore], 'PUT', customPath || path)(),
        patch: (customPath?: string) => useMutation.bind(this, [store, setStore], 'PATCH', customPath || path)(),
        delete: (customPath?: string) => useMutation.bind(this, [store, setStore], 'DELETE', customPath || path)()
    }
}

export default useAPI;