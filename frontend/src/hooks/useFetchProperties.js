import { useProperties } from '../context/PropertyContext';
import axiosInstance from '../axiosConfig';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useFetchProperties = ({pathname}) => {

    const {properties, setProperties} = useProperties();

    const isSearch = useLocation();

    useEffect(() => {

        if (isSearch.state?.isSearch) {
            return;
        }

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
