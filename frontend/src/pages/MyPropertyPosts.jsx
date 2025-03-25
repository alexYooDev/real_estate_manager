import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useProperties } from "../context/PropertyContext";
import PropertyList from "../components/PropertyList";
import axiosInstance from "../axiosConfig";

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
            setProperties((properties) =>
              properties.filter((property) => property.agent === user.id)
            );
          }
        };
        fetchProperties();
    }, []);

    return (
      <div>
        <h2 className='m-6 text-2xl font-semibold'>
          🏡 {user.name}'s Posts
        </h2>
        <PropertyList properties={properties} user={user} />
      </div>
    );
}

export default MyPropertyPosts;