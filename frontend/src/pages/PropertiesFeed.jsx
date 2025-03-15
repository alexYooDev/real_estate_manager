import PropertyList from "../components/PropertyList";
import { useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useProperties } from "../context/PropertyContext";
import useFetchProperties from "../hooks/useFetchProperties";

const PropertiesFeed = () => {

    const { user } = useAuth();
    const {setProperties} = useProperties();

    useFetchProperties();

    const handleDeleteProperty = useCallback((propertyId) => {
      setProperties((prev) => prev.filter((prop) => prop._id !== propertyId));
    }, []);
    
    return (
        <PropertyList
            user={user}
            onDelete={handleDeleteProperty}
            />
    );
}

export default PropertiesFeed;