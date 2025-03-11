import PropertyCard from "./PropetyCard";

const PropertyList = ({properties, user}) => {
    return (
        <div>
            {properties.map((property) => <PropertyCard property={property} user={user}/>)}
        </div>
    )
};

export default PropertyList;