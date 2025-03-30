import PropertyCard from "./PropertyCard";
import { useProperties } from "../context/PropertyContext";
import { useCallback } from "react";

const PropertyList = ({user, properties, onUnsave, savedProperties}) => {

    const { setProperties } = useProperties();

    const handleDeleteProperty = useCallback(
      (propertyId) => {
        setProperties((prev) => prev.filter((prop) => prop._id !== propertyId));
      },
      [setProperties]
    );

    return (
      <>
        {properties?.length === 0 && (
          <h3 className='text-lg font-bold text-center'>
            No Proproperties Found
          </h3>
        )}
        <div>
          {properties?.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              savedProperties={savedProperties}
              user={user}
              onUnsave={onUnsave}
              onDelete={handleDeleteProperty}
            />
          ))}
        </div>
      </>
    );
};

export default PropertyList;