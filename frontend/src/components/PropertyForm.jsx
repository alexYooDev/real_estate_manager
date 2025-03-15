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

    useEffect(() => {
      if (property) {
        setFeatures(property.features);
      }
      
      setFormData(property || {
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
    });
    }, [])

  const handleChange = (e) => {    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const addFeature = (e) => {
    e.preventDefault();
    
    if (feature.trim()) {
      setFeatures((prev) => [...prev, feature]); // Add new feature to the array
      setFeature(''); // Clear input field
    }
    setFormData((prev) => ({ ...prev,  features }));
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
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
      <label htmlFor='title' className='block mb-2 text-sm font-medium'>
        Title:
      </label>
      <input
        type='text'
        name='title'
        id='title'
        value={formData.title}
        onChange={handleChange}
        className='w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        required
      />
      <label htmlFor='description' className='block mb-2 text-sm font-medium'>
        Description:
      </label>
      <textarea
        id='description'
        type='text'
        name='description'
        value={formData.description}
        onChange={handleChange}
        className='w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        required
      />
      {isEditting && (
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
            <option value='pending'>Pending</option>
            <option value='sold'>Sold</option>
          </select>
        </div>
      )}
      <label htmlFor='price' className='block mb-2 text-sm font-medium'>
        Price:
      </label>
      <input
        type='number'
        id='pricce'
        name='price'
        value={formData.price}
        onChange={handleChange}
        className='w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        required
      />
      <label htmlFor='location' className='block mb-2 text-sm font-medium'>
        Location:
      </label>
      <input
        type='text'
        id='location'
        name='location'
        value={formData.location}
        onChange={handleChange}
        className='w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        required
      />
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
      <label htmlFor='images' className='block mb-2 text-sm font-medium'>
        Images:
      </label>
      <input
        type='file'
        id='images'
        name='images'
        onChange={handleImageChange}
        className='w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none'
        multiple
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