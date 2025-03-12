import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const PropertyCard = ({property, user, onDelete}) => {

  const navigate = useNavigate();

  const AUDollar = new Intl.NumberFormat('en-US', {
    style: 'currency', 
    currency: 'AUD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });

  const handleClickDetail = () => {
    navigate('/view-detail', {state: {property: property}});
  };

  const handleClickDelete = async () => {
    try {
      await axiosInstance.post('/api/delete-property', {_id: property._id});
      onDelete(property._id);
    } catch(error) {
      console.log(error);
    }
  };

  const handleClickUpdate = () => {
    navigate('/update-property', { state: {property: property} } );
  }

    return (
      <div className='m-2 overflow-hidden bg-white border rounded-lg shadow-lg'>
        <div className='p-4'>
          <div className='my-1'>
            <h3 className='text-lg font-semibold'>{property.title}</h3>
          </div>
          <div>
            <p>{property.description}</p>
          </div>
          <div className='my-1'>
            <p className='text-gray-600'>{property.location}</p>
          </div>
          <div className='flex justify-between'>
            <div className='flex'>
              <span className='flex flex-row mr-3'>
                <svg
                  className='w-5 h-5 mr-2'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 640 512'
                >
                  {' '}
                  :
                  <path d='M32 32c17.7 0 32 14.3 32 32l0 256 224 0 0-160c0-17.7 14.3-32 32-32l224 0c53 0 96 43 96 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-32-224 0-32 0L64 416l0 32c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z' />
                </svg>
                {property.bedrooms}
              </span>
              <span className='flex flex-row'>
                <svg
                  className='w-5 h-5 mr-2'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                >
                  <path d='M96 77.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9C130 91.8 128 101.7 128 112c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0L289 89c9.4-9.4 9.4-24.6 0-33.9c-7.9-7.9-19.8-9.1-29-3.8C246 39.2 227.9 32 208 32c-10.3 0-20.2 2-29.2 5.5L163.9 22.6C149.4 8.1 129.7 0 109.3 0C66.6 0 32 34.6 32 77.3L32 256c-17.7 0-32 14.3-32 32s14.3 32 32 32l448 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 256 96 77.3zM32 352l0 16c0 28.4 12.4 54 32 71.6L64 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-16 256 0 0 16c0 17.7 14.3 32 32 32s32-14.3 32-32l0-40.4c19.6-17.6 32-43.1 32-71.6l0-16L32 352z' />
                </svg>
                {property.bathrooms}
              </span>
            </div>
            <span className='text-xl font-bold text-blue-600'>
              {AUDollar.format(property.price)}
            </span>
          </div>
          <div className='flex justify-between'>
            <button
              className='px-4 py-2 mt-4 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600'
              onClick={handleClickDetail}
            >
              View Details
            </button>
            {property.agent === user?.id && (
              <div>
                <button className='px-4 py-2 mt-4 text-white transition bg-red-500 rounded-l-lg hover:bg-red-600' onClick={handleClickDelete}>
                  Delete
                </button>
                <button className='px-4 py-2 mt-4 text-white transition bg-orange-500 rounded-r-lg hover:bg-orange-600' onClick={handleClickUpdate}>
                  Update
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default PropertyCard;