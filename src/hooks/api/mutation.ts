import { useAPI } from './context';
import { interpolate } from './utils';

const defaultUpdateStore = (response: any, state: any): any => {
    return response;
}

const useMutation = ([store, setStore]: UseAPI.StateArray, method: string, url: string): UseAPI.MutationResponse => {
    const { base_url } = useAPI();

    const sendRequest = ({body, headers, params}: {body?: any, headers?: any, params?: any}, updateStore = defaultUpdateStore) => {
        const interpolated_url = interpolate(url, params);
        fetch(base_url + interpolated_url, {
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
                setStore({ ...store, error: null, data: updateStore(response, store.data), response: { ...store.response, [method]: response }, loading: false });
            })
            .catch(err => {
                setStore({ ...store, error: err.message, loading: false });
            });
    }

    return [{...store, response: store.response[method]}, sendRequest];

}

export default useMutation;