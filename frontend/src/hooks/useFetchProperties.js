import { useProperties } from '../context/PropertyContext';
import axiosInstance from '../axiosConfig';
import { useEffect } from 'react';

const useFetchProperties = () => {

    const {setProperties} = useProperties();

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axiosInstance.get(
                  '/api/view-all-property'
                );
                if (response) {
                  setProperties(response.data);
                }
            } catch(error) {
                console.log(error.message);
            }
        }
        fetchProperties();
    }, [])
};

export default useFetchProperties;
