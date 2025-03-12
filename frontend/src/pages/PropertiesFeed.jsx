import PropertyList from "../components/PropertyList";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const PropertiesFeed = () => {

    const { user } = useAuth();
    
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const fetchProperties = async () => {

            setIsLoading(true);
            try {
                const response = await axiosInstance.get('/api/view-all-property');
                setProperties(response.data);
                
            } catch (error) {
                console.log('No property to show');
            }
            
        }
        fetchProperties();
        setIsLoading(false);
    }, []);

    const handleDeleteProperty = useCallback((propertyId) => {
      setProperties((prev) => prev.filter((prop) => prop._id !== propertyId));

    }, []);
    
    return (
        <>
        {isLoading && <p>Loading...</p>}
        <PropertyList
            properties={properties}
            user={user}
            onDelete={handleDeleteProperty}
            />
        </>
    );
}

export default PropertiesFeed;