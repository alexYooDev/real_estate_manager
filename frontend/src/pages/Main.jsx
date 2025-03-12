import React, { useState } from 'react';

const Main = () => {
  // State to hold the filter values
  const [filters, setFilters] = useState({
    propertyType: '',
    bathrooms: '',
    bedrooms: '',
    priceRange: [0, 1000000],
    location: '',
    status: '',
  });

  // Handle filter changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <input
          type='text'
          name='location'
          placeholder='Search Location'
          value={filters.location}
          onChange={handleFilterChange}
          className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {/* Filter section in a single row */}
      <div className='flex flex-wrap gap-4 mb-6'>
        <select
          name='propertyType'
          value={filters.propertyType}
          onChange={handleFilterChange}
          className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto'
        >
          <option value=''>Property Type</option>
          <option value='House'>House</option>
          <option value='Apartment'>Apartment</option>
          <option value='Condo'>Condo</option>
          <option value='Land'>Land</option>
        </select>

        <select
          name='bathrooms'
          value={filters.bathrooms}
          onChange={handleFilterChange}
          className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto'
        >
          <option value=''>Bathrooms</option>
          {[1, 2, 3, 4, 5].map((bathroom) => (
            <option key={bathroom} value={bathroom}>
              {bathroom}
            </option>
          ))}
        </select>

        <select
          name='bedrooms'
          value={filters.bedrooms}
          onChange={handleFilterChange}
          className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto'
        >
          <option value=''>Bedrooms</option>
          {[1, 2, 3, 4, 5].map((bedroom) => (
            <option key={bedroom} value={bedroom}>
              {bedroom}
            </option>
          ))}
        </select>

        <div className='w-full sm:w-auto'>
          <label htmlFor='priceRange' className='block text-sm font-medium'>
            Price Range
          </label>
          <input
            type='range'
            name='priceRange'
            min='0'
            max='1000000'
            step='10000'
            value={filters.priceRange[0]}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: [Number(e.target.value), prev.priceRange[1]],
              }))
            }
            className='w-full'
          />
          <input
            type='range'
            name='priceRange'
            min='0'
            max='1000000'
            step='10000'
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: [prev.priceRange[0], Number(e.target.value)],
              }))
            }
            className='w-full'
          />
          <div className='flex justify-between text-sm'>
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>

        <select
          name='status'
          value={filters.status}
          onChange={handleFilterChange}
          className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto'
        >
          <option value=''>Status</option>
          <option value='For Sale'>For Sale</option>
          <option value='For Rent'>For Rent</option>
          <option value='Sold'>Sold</option>
        </select>
      </div>

      {/* Search Button */}
      <div className='flex justify-center'>
        <button
          onClick={() => console.log(filters)}
          className='px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          Search Properties
        </button>
      </div>
    </div>
  );
};

export default Main;
