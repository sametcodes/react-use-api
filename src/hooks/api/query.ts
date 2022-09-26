import { useState, useEffect } from 'react';
import qs from 'query-string';
import { useAPI } from './context';

const defaultState = {
    error: null,
    data: undefined,
    response: undefined,
    loading: true,
    variables: {}
};

const defaultUpdateState = (response: any, state: any): any => {
    return response;
}

const useQuery = (path: string, defaultVariables: any = {}): UseAPI.QueryResponse => {
    const { base_url } = useAPI();
    const [state, setState] = useState(Object.assign({}, defaultState, { variables: defaultVariables }));

    const sendRequest = (variables: any, updateState = defaultUpdateState) => {
        const query = qs.stringify(Object.assign({}, defaultVariables, variables));
        fetch(base_url + path + "?" + query)
            .then(response => {
                if (response.headers.get('content-type')?.includes('application/json')) {
                    return response.json();
                }
                throw new Error("Invalid response");
            })
            .then((response: any) => {
                setState({ ...state, variables, error: null, data: updateState(response, state.data), response, loading: false });
            })
            .catch(err => {
                setState({ ...state, variables, error: err.message, loading: false });
            });
    }

    useEffect(() => {
        sendRequest(state.variables);

        return () => {
            // TODO: Aborting request
        }
    }, [])

    return [state, sendRequest];
}

export default useQuery;