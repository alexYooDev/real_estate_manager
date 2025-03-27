import PropertyList from "../components/PropertyList";
import useFetchProperties from "../hooks/useFetchProperties";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../context/AuthContext";
import { useProperties } from "../context/PropertyContext";

const PropertiesFeed = () => {

    const { user } = useAuth();
    const pathname = useLocation();
    const { properties } = useProperties();

    /* fetch all properties for all including visitors */
    useFetchProperties(pathname);

    return (
      <div className="min-h-screen">
        <SearchBar/>
        <PropertyList
          properties={properties}
          user={user}
        />
      </div>
    );
}

export default PropertiesFeed;