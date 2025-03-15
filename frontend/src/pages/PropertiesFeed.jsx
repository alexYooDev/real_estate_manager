import PropertyList from "../components/PropertyList";
import { useAuth } from "../context/AuthContext";
import useFetchProperties from "../hooks/useFetchProperties";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useProperties } from "../context/PropertyContext";

const PropertiesFeed = () => {

    const { user } = useAuth();
    const pathname = useLocation();
    const { properties } = useProperties();

    useFetchProperties(pathname);

    return (
      <>
        <SearchBar/>
        <PropertyList
          properties={properties}
          user={user}
        />
      </>
    );
}

export default PropertiesFeed;