import PropertyList from "../components/PropertyList";
import { useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useProperties } from "../context/PropertyContext";
import useFetchProperties from "../hooks/useFetchProperties";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const PropertiesFeed = () => {

    const { user } = useAuth();
    const {setProperties} = useProperties();
    const pathname = useLocation();

    useFetchProperties(pathname);

    const handleDeleteProperty = useCallback((propertyId) => {
      setProperties((prev) => prev.filter((prop) => prop._id !== propertyId));
    }, []);
    
    return (
      <>
        <SearchBar/>
        <PropertyList
            user={user}
            onDelete={handleDeleteProperty}
        />
      </>
    );
}

export default PropertiesFeed;