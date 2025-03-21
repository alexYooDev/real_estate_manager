import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const PropertyForm = ({property, isEditting}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [feature, setFeature] = useState("");
  const [features, setFeatures] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    features: features,
    type: 'apartment',
    bedrooms: '',
    bathrooms: '',
    agent: user.id,
    status: '',
  });


  // this runs only when the components mounts 
  useEffect(() => {
    if (property) {
      setFeatures(property.features);
    }

    setFormData(
      property || {
        title: '',
        description: '',
        price: '',
        features: features,
        location: '',
        type: 'apartment',
        bedrooms: '',
        bathrooms: '',
        agent: user.id,
        status: 'for sale',
      }
    );
  }, [features, property, user.id]);


  // this runs every time features state updates
  useEffect(() => {
    setFormData((prev) => ({...prev, features}))
  }, [features])

  const handleChange = (e) => {    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const addFeature = (e) => {
    e.preventDefault();
    if (feature.trim()) {
      setFeatures((prev) => [...prev, feature]); // Add new feature to the array
      setFeature(''); // Clear input field
    }
  };

  const removeFeature = (index) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;

    console.log(formData)

    try {
      if (isEditting) {
        // only update property post when updating
        response = await axiosInstance.post(`/api/update-property/${formData._id}`, formData);
        
      } else {
        // only create new property post when not updating
        response = await axiosInstance.post('/api/create-property', formData);
      }
    } catch(error) {
      console.log(error);
    } finally {
      if (response.data) {
        navigate('/view-property');
      }
    }
    
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-3xl p-6 mx-auto border border-gray-300 rounded-lg bg-gray-50'
    >
      {isEditting ? (
        <h2 className='mb-6 text-2xl font-semibold'>Update this Property</h2>
      ) : (
        <h2 className='mb-6 text-2xl font-semibold'>Add New Property</h2>
      )}
      {/* Title */}
      <label htmlFor='title' className='block mb-2 text-sm font-medium'>
        Title:
      </label>
      <input
        type='text'
        name='title'
        id='title'
        placeholder='Enter your title'
        value={formData.title}
        onChange={handleChange}
        className='w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        required
      />
      {/* Description */}
      <label htmlFor='description' className='block mb-2 text-sm font-medium'>
        Description:
      </label>
      <textarea
        id='description'
        type='text'
        name='description'
        placeholder='Enter your description'
        value={formData.description}
        onChange={handleChange}
        className='w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        required
      />
      {/* Property Status */}
      <div>
        <label htmlFor='status' className='block mb-2 text-sm font-medium'>
          Status:
        </label>
        <select
          name='status'
          id='status'
          value={formData.status}
          onChange={handleChange}
          className='w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          required
        >
          <option value='for sale'>For Sale</option>
          <option value='for rent'>For Rent</option>
          {isEditting && (
            <>
              <option value='pending'>Pending</option>
              <option value='sold'>Sold</option>
            </>
          )}
        </select>
      </div>
      {/* Property Type */}
      <label htmlFor='type' className='block mb-2 text-sm font-medium'>
        Type:
      </label>
      <select
        name='type'
        id='type'
        value={formData.type}
        onChange={handleChange}
        className='w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        required
      >
        <option value='apartment'>Apartment</option>
        <option value='house'>House</option>
        <option value='office'>Office</option>
      </select>
      {/* Property Location */}
      <label htmlFor='location' className='block mb-2 text-sm font-medium'>
        Location:
      </label>
      <input
        type='text'
        id='location'
        name='location'
        placeholder='Enter the location'
        value={formData.location}
        onChange={handleChange}
        className='w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        required
      />
      {/* Property Price */}
      <label htmlFor='price' className='block mb-2 text-sm font-medium'>
        Price:
      </label>
      <input
        type='number'
        id='price'
        name='price'
        placeholder='Enter the Price'
        value={formData.price}
        onChange={handleChange}
        className='w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        required
      />
      {/* Features */}
      <div>
        <div className='flex items-center gap-1 mb-1'>
          <label className='block mb-2 text-sm font-medium' htmlFor='features'>
            Features:
          </label>
          <input
            id='features'
            type='text'
            className='w-4/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
            placeholder='Enter feature'
          />
          <button
            className='p-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            onClick={addFeature}
          >
            Add Feature
          </button>
        </div>
        <div className='mb-3'>
          <ul className='flex gap-3'>
            {features.map((feat, index) => (
              <li key={index}>
                {feat}{' '}
                <button className='ml-1' onClick={() => removeFeature(index)}>
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Number of bedroom */}
      <label htmlFor='bedrooms' className='block mb-2 text-sm font-medium'>
        Bedrooms:
      </label>
      <input
        type='number'
        id='bedrooms'
        name='bedrooms'
        value={formData.bedrooms}
        onChange={handleChange}
        className='w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        required
      />
      {/* Number of bathroom */}
      <label htmlFor='bathrooms' className='block mb-2 text-sm font-medium'>
        Bathrooms:
      </label>
      <input
        type='number'
        id='bathrooms'
        name='bathrooms'
        value={formData.bathrooms}
        onChange={handleChange}
        className='w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        required
      />
      <button
        type='submit'
        className='w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        Submit
      </button>
    </form>
  );
};

export default PropertyForm;