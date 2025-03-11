const PropertyCard = ({property}) => {
    return (
      <div className='overflow-hidden bg-white border rounded-lg shadow-lg'>
        <div className='p-4'>
          <h3 className='text-lg font-semibold'>{property.title}</h3>
          <p className='text-gray-600'>{property.location}</p>
          <span className='text-xl font-bold text-blue-600'>
            ${property.price}
          </span>
          <button className='px-4 py-2 mt-4 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600'>
            View Details
          </button>
        </div>
      </div>
    );
};

export default PropertyCard;