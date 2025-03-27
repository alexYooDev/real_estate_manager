import { useEffect, useState } from "react";
import PropertyList from "../components/PropertyList";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";
import Error401 from "./Error401";

const MySavedPosts = () => {

    const {user} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [savedProperties ,setSavedProperties] = useState();

    useEffect(() => {
        const fetchSavedProperties = async () => {
          try {
            setIsLoading(true);
            const response = await axiosInstance.get(
              '/api/view-saved-property',
              {
                headers: { Authorization: `Bearer ${user.token}` },
              }
            );
            if (response) {
              setSavedProperties(response.data);
            } 
            
            setIsLoading(false);
            
          } catch (error) {
            console.log(error.message);
          } 
        };
        fetchSavedProperties();
    }, []);

    /* Remove unsaved property from the view */
    const handleUnsaveProperty = (propertyId) => {
      setSavedProperties((prev) => prev?.filter((p) => p._id !== propertyId));
    };

    if (!user) {
      return <Error401 />;
    }
    
    return (
      <div>
        <h2 className='m-6 text-2xl font-semibold'>
          🚩 {user.name}'s Saved Posts
        </h2>
        {isLoading ? (
          <p className='text-center'>loading...</p>
        ) : (
          <PropertyList
            properties={savedProperties}
            savedProperties={savedProperties}
            onUnsave={handleUnsaveProperty}
            user={user}
          />
        )}
        {!savedProperties && <p>No Saved Properties Found!</p>}
      </div>
    );
}

export default MySavedPosts;