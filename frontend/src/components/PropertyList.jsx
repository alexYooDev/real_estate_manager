import PropertyCard from "./PropetyCard";

const PropertyList = ({properties, user, onDelete}) => {
    return (
        <div>
            {properties.map((property) => <PropertyCard property={property} user={user} onDelete={onDelete} />)}
        </div>
    )
};

export default PropertyList;