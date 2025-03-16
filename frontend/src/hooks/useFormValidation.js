import {useState} from 'react';

const useFormValition = (initState, validateFunction) => {
    const [formData, setFormData] = useState(initState);
    const [errors, setErrors] = useState({});
    const [isAgent, setIsAgent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({...prev, [name]: value}));
        setErrors((prev) => ({...prev, [name]: ""}));
          
        if (name === 'role' && value === 'agent') {
            setIsAgent(true);
        } else if (name === 'role'){
            setIsAgent(false);
        }
    };

    const isValidated = () => {
        const currentErrors = validateFunction(formData);
        setErrors(currentErrors);
        return Object.keys(currentErrors).length === 0;
    }

    return { formData, errors, handleChange, isValidated, isAgent};
}

export default useFormValition;