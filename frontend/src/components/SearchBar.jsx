const SearchBar = ({value, onChange, onClick}) => {
    return (
      <div className='flex mb-6'>
        <input
          type='text'
          name='location'
          placeholder='Search Location'
          value={value}
          onChange={onChange}
          className='w-full px-4 py-2 border rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <div className='flex justify-center'>
          <button
            onClick={onClick}
            className='px-6 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Search Properties
          </button>
        </div>
      </div>
    );
}

export default SearchBar;