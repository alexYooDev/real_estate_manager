import { useEffect, useState } from "react";
import PropertyForm from "../components/PropertyForm";
import { useLocation } from "react-router";
import axiosInstance from "../axiosConfig";

const UpdateProperty = () => {
    const {state: { property }} = useLocation();
    const [isEditting, setIsEditting] = useState(true);

    
    return <div className='container p-6 mx-auto'>
        <PropertyForm property={property} isEditting={isEditting}/>
    </div>;
}

export default UpdateProperty;