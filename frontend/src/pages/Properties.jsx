import { useState, useEffect } from 'react';
import PropertyForm from '../components/PropertyForm';

const Properties = () => {
  const [isEditting, setIsEditting] = useState(false);

  return (
    <div className="container p-6 mx-auto">
      <PropertyForm isEditting={isEditting}/>
    </div>
  );
};

export default Properties;
