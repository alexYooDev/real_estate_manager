const FilterControl = ({filters, onChange, setFilters}) => {

    const Dollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });

    return (
      <div className='flex flex-wrap justify-center gap-4 mb-6'>
        <select
          name='type'
          value={filters.type}
          onChange={onChange}
          className='px-2 py-1 text-sm border rounded-md shadow-sm w-36 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto'
        >
          <option value=''>Property Type</option>
          <option value='house'>House</option>
          <option value='apartment'>Apartment</option>
          <option value='office'>Office</option>
        </select>

        <select
          name='bathrooms'
          value={filters.bathrooms}
          onChange={onChange}
          className='px-2 py-1 text-sm border rounded-md shadow-sm w-36 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto'
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
          onChange={onChange}
          className='px-2 py-1 text-sm border rounded-md shadow-sm w-36 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto'
        >
          <option value=''>Bedrooms</option>
          {[1, 2, 3, 4, 5].map((bedroom) => (
            <option key={bedroom} value={bedroom}>
              {bedroom}
            </option>
          ))}
        </select>
        <select
          name='status'
          value={filters.status}
          onChange={onChange}
          className='px-2 py-1 text-sm border rounded-md shadow-sm w-36 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto'
        >
          <option value=''>Status</option>
          <option value='For Sale'>For Sale</option>
          <option value='For Rent'>For Rent</option>
          <option value='Sold'>Sold</option>
        </select>
        <div className='w-full sm:w-auto'>
          <label htmlFor='priceRange' className='block text-sm font-medium'>
            Price Range
          </label>
          <div className='flex'>
            <div className='text-sm'>
              <span>{Dollar.format(filters.price[0])}</span>
            </div>
            <input
              type='range'
              name='priceRange'
              min='0'
              max='10000000'
              step='1000'
              value={filters.price[0]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  price: [Number(e.target.value), prev.price[1]],
                }))
              }
              className='w-full'
            />
            <input
              type='range'
              name='priceRange'
              min='0'
              max='10000000'
              step='1000'
              value={filters.price[1]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  price: [prev.price[0], Number(e.target.value)],
                }))
              }
              className='w-full'
            />
            <div className='text-sm'>
              <span>{Dollar.format(filters.price[1])}</span>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FilterControl;