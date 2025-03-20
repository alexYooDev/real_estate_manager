import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const PropertyDetail = () => {

    const {state: { property }} = useLocation();
    
    const [agent, setAgent] = useState({});

    useEffect(() => {
      const fetchAgentProfile = async () => {
        try {
          const response = await axiosInstance(
            `/api/auth/detail/${property.agent}`
          );
          setAgent(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchAgentProfile();
    }, [property.agent]);

    return (
      <div className='flex justify-center min-h-screen p-6 bg-gray-100'>
        <div className='w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg max-h-fit'>
          {/* Property Info */}
          <div className='p-6'>
            <h2 className='text-3xl font-bold text-gray-800'>
              {property.title}
            </h2>
            <div className='items-center mt-2'>
              <h3 className='font-semibold'>Location</h3>
              <span className='text-gray-600 '>{property.location}</span>
            </div>
            <div className='items-center'>
              <h3 className='font-semibold'>Property Type</h3>
              <span>
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </span>
            </div>
            <div className='flex items-center gap-4 my-4 text-gray-700'>
              <div className='flex items-center'>
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className='flex items-center'>
                <span>{property.bathrooms} Bathrooms</span>
              </div>
            </div>
            {property.features.length > 0 && (
              <div className=''>
                <h3 className='font-semibold'>Key features</h3>
                <ul className='grid grid-cols-5 gap-1'>
                  {property.features.map((feat, i) => (
                    <li className='m-1 list-none' key={i}>
                      ✅ {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Property Description */}
            <p className='mt-4 text-gray-600'>{property.description}</p>
            <div className='flex items-center mt-4 text-gray-700'>
              <span className='text-2xl font-semibold'>
                ${property.price.toLocaleString()}
              </span>
            </div>
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
                <p className='text-gray-600'>{agent.agency}</p>
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