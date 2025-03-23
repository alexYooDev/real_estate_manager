import PropertyCard from "./PropetyCard";
import { useProperties } from "../context/PropertyContext";
import { useCallback, useEffect } from "react";

const PropertyList = ({user, properties, savedProperties}) => {

    const { setProperties } = useProperties();

    const handleDeleteProperty = useCallback((propertyId) => {
          setProperties((prev) => prev.filter((prop) => prop._id !== propertyId));
        }, []);

    return (
        <>
        {properties?.length === 0 && <h3 className="text-lg font-bold text-center">No Proproperties Found</h3>}
            <div>
                {properties?.map((property) => <PropertyCard key={property._id} property={property} savedProperties={savedProperties} user={user} onDelete={handleDeleteProperty} />)}
            </div>
        </>
    )
};

export default PropertyList;