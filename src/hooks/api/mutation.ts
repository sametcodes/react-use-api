import { useState } from 'react';
import { useAPI } from './context';

const defaultState = {
    error: null,
    data: undefined,
    response: undefined,
    loading: true
};

const useMutation = (method: string, url: string): UseAPI.MutationResponse => {
    const { base_url } = useAPI();
    const [state, setState] = useState(defaultState);

    const sendRequest = (body: any, headers?: any) => {
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
                setState({ ...state, error: null, data: response.data, response, loading: false });
            })
            .catch(err => {
                setState({ ...state, error: err.message, loading: false });
            });
    }

    return [state, sendRequest];

}

export default useMutation;