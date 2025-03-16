import React from 'react';
import SearchBar from '../components/SearchBar';
import { useLocation} from 'react-router-dom';
import useFetchProperties from '../hooks/useFetchProperties';

const Main = () => {

  const pathname = useLocation();
  
  useFetchProperties(pathname);

  return (
    <div className='bg-gradient-to-r from-blue-500 to-teal-100'>
      <div className='flex flex-col text-center justify-evenly h-dvh'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='mb-2 text-4xl'>
            Connecting Buyers and Agents — All in One Place.
          </h1>
          <p className='text-lg'>
            Buy, sell, or manage real estate effortlessly.
          </p>
        </div>
        <SearchBar />
      </div>
    </div>
  );
};

export default Main;
