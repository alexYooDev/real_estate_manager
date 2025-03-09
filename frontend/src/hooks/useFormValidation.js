import {useState} from 'react';

const useFormValition = (initState, validateFunc) => {
    const [formData, setFormData] = useState(initState);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        setErrors({...errors, [e.target.name]: ""});        
    };

    const validate = () => {
        const currentErrors = validateFunc(formData);
        setErrors(currentErrors);
        return Object.keys(currentErrors).length === 0;
    }

    return { formData, errors, handleChange, validate };
}

export default useFormValition;