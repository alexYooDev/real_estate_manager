import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useProperties } from "../context/PropertyContext";
import PropertyList from "../components/PropertyList";
import axiosInstance from "../axiosConfig";
import Error401 from "./Error401";


const MyPropertyPosts = () => {
    
    const {user} = useAuth();
    const {properties, setProperties} = useProperties();

    /* Fetch all properties from the server and process data in the Frontend where (property's agent id equals to user's id) */
    useEffect(() => {
        const fetchProperties = async () => {
          try {
            const response = await axiosInstance.get('/api/view-all-property', {
              headers: { Authorization: `Bearer ${user.token}` },
            });
            if (response) {
              setProperties(response.data);
            }
          } catch (error) {
            console.log(error.message);
          }
          if (user) {
            setProperties((properties) =>
              properties.filter((property) => property.agent === user.id)
            );
          }
        };
        fetchProperties();
    }, []);

    if(!user) {
      return <Error401 />;
    }

    return (
      <div className='min-h-screen mx-auto mt-20'>
        <h2 className='m-6 text-2xl font-semibold'>🏡 {user.name}'s Posts</h2>
        <PropertyList properties={properties} user={user} />
      </div>
    );
}

export default MyPropertyPosts;