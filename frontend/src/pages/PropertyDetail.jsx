import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const PropertyDetail = () => {

    const {state: { property, agent} } = useLocation();
    const [sheduleDate, setScheduleDate] = useState("");
    const {user} = useAuth();
    const navigate = useNavigate();

    const handleClickContact = () => {

      let proceed 

      /* if not logged in, prompt user to login */
      if (!user) {
        proceed = window.confirm('You need to login to contact the agent!');
      }

      /* if user click ok, navigate to log in */
      if (proceed) {
        navigate('/login');
      }

      /* if user logged in, open mail app to send generated email to the agent */
      if (user) {
        const title = encodeURIComponent(`[${user.name}] Property Inquiry`);
        
        let inspectionStatement = `I'd like to apply for an inspection`;
        if (sheduleDate) {
          inspectionStatement = `I'd like to apply for an inspection on ${new Date(
            sheduleDate
          ).toLocaleString('en-AU')}`;
        } 
        const body = encodeURIComponent(
          `Hi! I am interested in inquiring about your property at ${property.location}.\n ${inspectionStatement} \n Please let me know more details!`
        );
        window.location.href = `mailto:${agent.email}?subject=${title}&body=${body}`;
      }
    };
    
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
            <div className='my-2'>
              <h3 className='font-semibold'>Area</h3>
              <span>{property.area} m²</span>
            </div>
            <h3 className='font-semibold'>Room Specification</h3>
            <div className='flex items-center gap-4 my-2 text-gray-700'>
              <div className='flex items-center'>
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className='flex items-center'>
                <span>{property.bathrooms} Bathrooms</span>
              </div>
            </div>
            {property.features.length > 0 && (
              <div>
                <h3 className='font-semibold'>Key features</h3>
                <ul className='grid grid-cols-3 gap-1'>
                  {property.features.map((feat, i) => (
                    <li className='m-1 list-none' key={feat + i}>
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
                {property.status === 'for rent'
                  ? '$' +
                    ((property.price / 12) * 0.01).toLocaleString() +
                    ' / Week'
                  : '$' + property.price.toLocaleString()}
              </span>
            </div>
            <div className='my-1'>
              {property.status === 'for sale' ? (
                <span className='bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300'>
                  {property.status.toUpperCase()}
                </span>
              ) : property.status === 'sold' ? (
                <span className='bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300'>
                  {property.status.toUpperCase()}
                </span>
              ) : property.status === 'for rent' ? (
                <span className='bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-700 dark:text-blue-300'>
                  {property.status.toUpperCase()}
                </span>
              ) : (
                <span className='bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300'>
                  {property.status.toUpperCase()}
                </span>
              )}
            </div>
            {/* Agent Info */}
            <div className='flex items-center p-4 mt-6 rounded-lg shadow-md bg-gray-50'>
              <div className='ml-4'>
                <p className='text-lg font-semibold text-gray-800'>
                  {agent.name}
                </p>
                <p className='text-gray-600'>{agent.agency}</p>
                <p className='text-gray-600'>{agent.email}</p>
              </div>
            </div>
            {/* Avaiable for inspection */}
            {user?._id !== agent && property.inspection.length > 0 && (
              <div className='grid items-center justify-between grid-flow-col m-3'>
                <div>
                  <h3 className='text-xl font-bold text-gray-800'>
                    Inspection Available on
                  </h3>
                  <ul className='grid grid-flow-row gap-2 grid-col-2'>
                    {property.inspection.map((ins) => (
                      <li>✔️ {new Date(ins).toLocaleString('en-AU')}</li>
                    ))}
                  </ul>
                </div>
                <div className='flex flex-col gap-2'>
                  <label
                    className='text-lg font-bold text-gray-800'
                    htmlFor='inspection'
                  >
                    Schedule Inspection At
                  </label>
                  <select
                    name='inspection'
                    id='inspection'
                    className='w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={sheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                  >
                    {property.inspection.map((ins) => (
                      <option value={ins}>
                        {new Date(ins).toLocaleString('en-AU')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            <button
              onClick={handleClickContact}
              className='w-full py-3 text-lg font-semibold text-white transition bg-blue-500 rounded-lg hover:bg-blue-700'
            >
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    );
}

export default PropertyDetail;