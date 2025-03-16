import { createContext, useState, useContext } from "react";

const PropertyContext = createContext();

export const PropertyProvider = ({children}) => {
    const [properties, setProperties] = useState([]);

    return (
        <PropertyContext.Provider value={{properties, setProperties}}>
            {children}
        </PropertyContext.Provider>
    )
}

export const useProperties = () => useContext(PropertyContext);