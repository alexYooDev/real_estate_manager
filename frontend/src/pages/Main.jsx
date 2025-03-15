import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import FilterControl from '../components/FilterControl';
import axiosInstance from '../axiosConfig';
import {useNavigate} from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import useFetchProperties from '../hooks/useFetchProperties';

const Main = () => {
  // State to hold the filter values

  const navigate = useNavigate();
  const {setProperties} = useProperties();

  const [filters, setFilters] = useState({
    type: '',
    bathrooms: '',
    bedrooms: '',
    price: [0, 100000000],
    location: '',
    status: '',
  });

  useFetchProperties();

  // Handle filter changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchClick = async () => {
    const query = new URLSearchParams(filters).toString();
    try {
      const response = await axiosInstance.get(`/api/search-property?${query}`);
      setProperties(response.data);
    } catch(error) {
      console.log(error)
    } finally {
      navigate('/view-property');
    }
  }

  return (
    <div className='p-6'>
      <SearchBar
        value={filters.location}
        onChange={handleFilterChange}
        onClick={handleSearchClick}
      />
      {/* Filter section in a single row */}
      <FilterControl filters={filters} onChange={handleFilterChange} setFilters={setFilters}/>
    </div>
  );
};

export default Main;
