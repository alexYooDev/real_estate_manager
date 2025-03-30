import { useState } from "react";
import PropertyForm from "../components/PropertyForm";
import { useLocation } from "react-router";

const UpdateProperty = () => {
  const {
    state: { property },
  } = useLocation();

  // eslint-disable-next-line no-unused-vars
  const [isEditing, setIsEdtting] = useState(true);

  return (
    <div className='container p-6 mx-auto'>
      <PropertyForm property={property} isEditing={isEditing} />
    </div>
  );
}

export default UpdateProperty;