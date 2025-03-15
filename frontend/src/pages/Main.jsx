import React from 'react';
import SearchBar from '../components/SearchBar';
import { useLocation} from 'react-router-dom';
import useFetchProperties from '../hooks/useFetchProperties';

const Main = () => {

  const pathname = useLocation();
  
  useFetchProperties(pathname);


  return (
    <div>
      <SearchBar />
    </div>
  );
};

export default Main;
