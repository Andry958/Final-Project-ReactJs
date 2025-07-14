import { createContext, useState } from "react";

const initialState = {
    value: [],
    setValue: () => { },
    selectedItem: null,
    setSelectedItem: () => { }
};

export const AllNewsContext = createContext(initialState);

export const AllNewsProvider = ({ children }) => {
    const [value, setValue] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <AllNewsContext.Provider value={{ value, setValue, selectedItem, setSelectedItem }}>
            {children}
        </AllNewsContext.Provider>
    );
}
