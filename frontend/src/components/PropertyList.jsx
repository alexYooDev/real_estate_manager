import PropertyCard from "./PropetyCard";
import { useProperties } from "../context/PropertyContext";

const PropertyList = ({user, onDelete}) => {

    const {properties} = useProperties();

    return (
        <div>
            {properties.map((property) => <PropertyCard key={property._id} property={property} user={user} onDelete={onDelete} />)}
        </div>
    )
};

export default PropertyList;