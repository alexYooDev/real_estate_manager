import {useState} from 'react';

const useFormValition = (initState, validateFunction) => {
    const [formData, setFormData] = useState(initState);
    const [checkPassword, setCheckPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isAgent, setIsAgent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({...prev, [name]: value}));
        if (name === 'checkPassword') setCheckPassword(value);
        setErrors((prev) => ({...prev, [name]: ""}));
          
        if (name === 'role' && value === 'agent') {
            setIsAgent(true);
        } else if (name === 'role') {
            setIsAgent(false);
        }
    };

    if (checkPassword === formData.password) {

    }

    const isValidated = () => {
        const currentErrors = validateFunction(formData, checkPassword);
        setErrors(currentErrors);
        return Object.keys(currentErrors).length === 0;
    }

    return { formData, checkPassword, errors, handleChange, isValidated, isAgent};
}

export default useFormValition;