import PropertyCard from "./PropetyCard";
import { useProperties } from "../context/PropertyContext";

const PropertyList = ({user, onDelete}) => {

    const {properties} = useProperties();

    return (
        <>
        {properties.length === 0 && <h3 className="text-lg font-bold text-center">No Proproperties Found</h3>}
            <div>
                {properties.map((property) => <PropertyCard key={property._id} property={property} user={user} onDelete={onDelete} />)}
            </div>
        </>
    )
};

export default PropertyList;