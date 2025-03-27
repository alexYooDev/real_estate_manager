import { createContext, useState, useContext } from "react";

const PropertyContext = createContext();

export const PropertyProvider = ({children}) => {
    const [properties, setProperties] = useState([]);
    const [propertyId, setPropertyId] = useState("");

    const savePostId = (newSave) => {
        setPropertyId(newSave);
    };

    return (
        <PropertyContext.Provider value={{properties, setProperties}}>
            {children}
        </PropertyContext.Provider>
    )
}

export const useProperties = () => useContext(PropertyContext);