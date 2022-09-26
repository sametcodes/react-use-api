import React, { useContext } from "react";

interface IAPIContext {
    base_url: string;
};

const Context = React.createContext<IAPIContext>({base_url: ""});

const APIContext = ({ children, options }: { children: JSX.Element, options: IAPIContext }) => {
    return <Context.Provider value={options}>
        {children}
    </Context.Provider>;
}

export const useAPI = () => useContext(Context);
export default APIContext;