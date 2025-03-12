import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const PropertyForm = ({property, isEditting}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: 'apartment',
    bedrooms: '',
    bathrooms: '',
    images: [],
    agent: user.id,
    status: 'for sale',
  });

    useEffect(() => {
      setFormData(property || {
    title: '',
    description: '',
    price: '',
    location: '',
    type: 'apartment',
    bedrooms: '',
    bathrooms: '',
    images: [],
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditting) {
        // only update property post when updating
        await axiosInstance.post(`/api/update-property/${formData._id}`, formData);
      } else {
        // only create new property post when not updating
        await axiosInstance.post('/api/create-property', formData);
      }
    } catch(error) {
      console.log(error);
    }
    
    navigate('/view-property');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl p-6 mx-auto border border-gray-300 rounded-lg bg-gray-50">
      <h2 className="mb-6 text-2xl font-semibold">Add New Property</h2>

      <label htmlFor='title' className="block mb-2 text-sm font-medium">Title:</label>
      <input
        type="text"
        name="title"
        id='title'
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <label htmlFor='description' className="block mb-2 text-sm font-medium">Description:</label>
      <textarea
        id='description'
        type='text'
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <label htmlFor='price' className="block mb-2 text-sm font-medium">Price:</label>
      <input
        type="number"
        id='pricce'
        name="price"
        value={formData.price}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <label htmlFor='location' className="block mb-2 text-sm font-medium">Location:</label>
      <input
        type="text"
        id='location'
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <label htmlFor='type' className="block mb-2 text-sm font-medium">Type:</label>
      <select
        name="type"
        id='type'
        value={formData.type}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="office">Office</option>
      </select>

      <label htmlFor='bedrooms' className="block mb-2 text-sm font-medium">Bedrooms:</label>
      <input
        type="number"
        id='bedrooms'
        name="bedrooms"
        value={formData.bedrooms}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <label htmlFor='bathrooms' className="block mb-2 text-sm font-medium">Bathrooms:</label>
      <input
        type="number"
        id='bathrooms'
        name="bathrooms"
        value={formData.bathrooms}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <label htmlFor='images' className="block mb-2 text-sm font-medium">Images:</label>
      <input
        type="file"
        id='images'
        name="images"
        onChange={handleImageChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
        multiple
      />
      <button
        type="submit"
        className="w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default PropertyForm;