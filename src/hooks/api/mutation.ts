import { useState } from 'react';
import { useAPI } from './context';

const defaultUpdateStore = (response: any, state: any): any => {
    return response;
}

const useMutation = ([store, setStore]: UseAPI.StateArray, method: string, url: string): UseAPI.MutationResponse => {
    const { base_url } = useAPI();

    const sendRequest = ({body, headers}: {body: any, headers?: any}, updateStore = defaultUpdateStore) => {
        fetch(base_url + url, {
            method,
            headers,
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.headers.get('content-type')?.includes('application/json')) {
                    return response.json();
                }
                throw new Error("Invalid response");
            })
            .then((response: any) => {
                setStore({ ...store, error: null, data: updateStore(response, store.data), response, loading: false });
            })
            .catch(err => {
                setStore({ ...store, error: err.message, loading: false });
            });
    }

    return [store, sendRequest];

}

export default useMutation;