import FilterControl from '../components/FilterControl';
import axiosInstance from '../axiosConfig';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import useFetchProperties from '../hooks/useFetchProperties';

const SearchBar = () => {

  const { setProperties } = useProperties();
  const navigate = useNavigate();
  const pathname = useLocation();

  const initFilters = {
    type: '',
    bathrooms: '',
    bedrooms: '',
    price: [0, 100000000],
    location: '',
    status: '',
  };

  const [filters, setFilters] = useState(initFilters);
  
  useFetchProperties(pathname);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchSubmit = async () => {

    const query = new URLSearchParams(filters).toString();
    try {
      const response = await axiosInstance.get(`/api/search-property?${query}`);
      setProperties(response.data);
    } catch (error) {
      console.log(error);
    }
    setFilters(initFilters);
    navigate('/view-property', { state: { isSearch: true } });
  };

  return (
    <form className='p-6' onSubmit={handleSearchSubmit}>
      <div className='flex mb-6'>
        <input
          type='text'
          name='location'
          placeholder='Search Location'
          value={filters.location}
          onChange={handleFilterChange}
          className='w-full px-4 py-2 border rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <div className='flex justify-center'>
          <button
            className='px-6 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Search Properties
          </button>
        </div>
      </div>
      <FilterControl
        filters={filters}
        onChange={handleFilterChange}
        setFilters={setFilters}
      />
    </form>
  );
};

export default SearchBar;
