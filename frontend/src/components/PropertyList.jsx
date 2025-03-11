import PropertyCard from "./PropetyCard";

const PropertyList = ({properties}) => {
    return (
        <div>
            {properties.map((property) => <PropertyCard property={property}/>)}
        </div>
    )
};

export default PropertyList;