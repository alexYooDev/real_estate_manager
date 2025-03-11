import {useLocation} from 'react-router-dom';

const PropertyDetail = () => {

    const {state: { property }} = useLocation();
    
    const agent =  {
      name: "John Doe",
      firm: "Brisbane Real Estate",
      email: "john.doe@example.com",
      avatar: "https://source.unsplash.com/100x100/?man",
    }

    return (
      <div className='flex justify-center min-h-screen p-6 bg-gray-100'>
        <div className='w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg'>
          {/* Image Carousel */}

          {/* Property Info */}
          <div className='p-6'>
            <h2 className='text-3xl font-bold text-gray-800'>
              {property.title}
            </h2>

            <div className='flex items-center mt-2 text-gray-600'>
              <span>{property.location}</span>
            </div>
            <div className='flex items-center'>
                <span>{property.type}</span>
            </div>
            <div className='flex items-center gap-4 mt-4 text-gray-700'>
              <div className='flex items-center'>
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className='flex items-center'>
                <span>{property.bathrooms} Bathrooms</span>
              </div>
            </div>

            <div className='flex items-center mt-4 text-gray-700'>
              <span className='text-2xl font-semibold'>
                ${property.price.toLocaleString()}
              </span>
            </div>

            {/* Property Description */}
            <p className='mt-4 text-gray-600'>{property.description}</p>

            {/* Agent Info */}
            <div className='flex items-center p-4 mt-6 rounded-lg shadow-md bg-gray-50'>
            <img
              src={agent.avatar}
              alt='Agent'
              className='w-16 h-16 border-2 border-gray-300 rounded-full'
            />
            <div className='ml-4'>
              <p className='text-lg font-semibold text-gray-800'>
                {agent.name}
              </p>
              <p className='text-gray-600'>{agent.firm}</p>
              <p className='text-gray-600'>{agent.email}</p>
            </div>
            </div>

            {/* Contact Button */}
            <button className='w-full py-3 mt-6 text-lg font-semibold text-white transition bg-blue-500 rounded-lg hover:bg-blue-700'>
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    );
}

export default PropertyDetail;