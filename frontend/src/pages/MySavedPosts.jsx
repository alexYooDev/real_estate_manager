import { useEffect } from "react";
import PropertyList from "../components/PropertyList";
import { useAuth } from "../context/AuthContext";
import { useProperties } from "../context/PropertyContext";
import axiosInstance from "axios";


const MySavedPosts = () => {

    const {user} = useAuth();
    const { properties, setProperties } = useProperties();

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
            setProperties((properties) =>
              properties.filter((property) => property._id === user.id)
            );
          }
        };
        fetchProperties();
    }, [])
    
    return <PropertyList properties={properties} user={user} />;
}

export default MySavedPosts;