import { useState, useEffect } from 'react';
import qs from 'query-string';
import { useAPI } from './context';

const defaultUpdateStore = (response: any, state: any): any => {
    return response;
}

const useQuery = ([store, setStore]: UseAPI.StateArray, path: string, initialVariables: any): UseAPI.QueryResponse => {
    const { base_url } = useAPI();

    const sendRequest = (queryVariables: any = {}, updateStore = defaultUpdateStore) => {
        const variables = { ...store.variables, ...queryVariables };
        const query = qs.stringify(variables);
        fetch(base_url + path + "?" + query)
            .then(response => {
                if (response.headers.get('content-type')?.includes('application/json')) {
                    return response.json();
                }
                throw new Error("Invalid response");
            })
            .then((response: any) => {
                setStore({ ...store, variables, error: null, data: updateStore(response, store.data), response: { GET: response }, loading: false });
            })
            .catch(err => {
                setStore({ ...store, variables, error: err.message, loading: false, response: { GET: undefined } });
            });
    }

    useEffect(() => {
        sendRequest(initialVariables);

        return () => {
            // TODO: Aborting request
        }
    }, [])

    return [{ ...store, response: store.response.GET }, sendRequest];
}

export default useQuery;