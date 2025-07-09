import { createContext, useState } from "react";

const initialState = {
    value: [],
    setValue: () => { }
};

export const AllNewsContext = createContext(initialState);

export const AllNewsProvider = ({ children }) => {
    const [value, setValue] = useState(initialState.value);

    return (
        <AllNewsContext.Provider value={{ value, setValue }}>
            {children}
        </AllNewsContext.Provider>
    );
}