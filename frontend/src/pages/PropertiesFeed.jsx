import PropertyList from "../components/PropertyList";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const PropertiesFeed = () => {

    const { user } = useAuth();
    
    const [properties, setProperties] = useState([]);

    useEffect(() => {

        const fetchProperties = async () => {

            try {
                const response = await axiosInstance.get('/api/view-all-property');
                setProperties(response.data);
            } catch (error) {
                console.log('No property to show');
            }
            
        }
        fetchProperties();
    }, [properties]);

    const handleDeleteProperty = (propertyId) => {
      setProperties((prev) => prev.filter((prop) => prop._id !== propertyId));
    };
    
    return (
      <PropertyList
        properties={properties}
        user={user}
        onDelete={handleDeleteProperty}
      />
    );
}

export default PropertiesFeed;