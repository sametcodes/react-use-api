declare module UseAPI {
    export type StateArray = [State, React.Dispatch<React.SetStateAction<State>>];
    export interface ResponseData {
        data: any;
        response: any;
        error: any;
        loading: boolean;
        variables?: any;
    }
    
    export type QueryResponse = [ResponseData, (variables: any, updateState?: (response: any, state: any) => any) => void];
    export type MutationResponse = [ResponseData, (body: any, headers?: any) => void];
}
