import { useAuth } from "../context/AuthContext";
import PropertyList from "../components/PropertyList";
import { useEffect } from "react";
import axiosInstance from "../axiosConfig";
import { useProperties } from "../context/PropertyContext";

const MyPropertyPosts = () => {
    
    const {user} = useAuth();
    const {properties, setProperties} = useProperties();
    
    useEffect(() => {
        const fetchProperties = async () => {
          try {
            const response = await axiosInstance.get('/api/view-all-property');
            if (response) {
              setProperties(response.data);
            }
          } catch (error) {
            console.log(error.message);
          } finally {
              setProperties((properties) => properties.filter((property) => property.agent === user.id));
          }
        };
        fetchProperties();
    }, []);

    return (
        <PropertyList properties={properties} user={user}/>
    );
}

export default MyPropertyPosts;