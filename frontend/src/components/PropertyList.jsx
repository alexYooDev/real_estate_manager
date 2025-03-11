import PropertyCard from "./PropetyCard";

const PropertyList = ({properties}) => {
    return (
        <>
            {properties.map((property) => <PropertyCard property={property}/>)}
        </>
    )
};

export default PropertyList;