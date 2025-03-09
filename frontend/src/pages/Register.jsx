import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

import useFormValition from '../hooks/useFormValidation';
import { validateForm } from '../utils/validateForm';

const Register = () => {

  // role added to the formData state
  // const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
  
  const {formData, errors, handleChange, validate } = useFormValition(
    {name: "", email: "", password: "", role: ""}, 
    validateForm
  );
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      // if the user input is validated 
      if (validate()) {
        await axiosInstance.post('/api/auth/register', formData);
        alert('Registration successful. Please log in.');
        navigate('/login');
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className='max-w-md mx-auto mt-20'>
      <form onSubmit={handleSubmit} className='p-6 bg-white rounded shadow-md'>
        <h1 className='mb-4 text-2xl font-bold text-center'>Register</h1>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className='w-full p-2 border rounded'
        />
        {errors.name && <p className='text-sm text-red-500'>{errors.name}</p>}
        <input
          type='email'
          placeholder='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          className='w-full p-2 mt-4 border rounded'
          />
        {errors.email && <p className='text-sm text-red-500'>{errors.email}</p>}
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
          className='w-full p-2 mt-4 border rounded'
          />
        {errors.password && <p className='text-sm text-red-500'>{errors.password}</p>}
        <label htmlFor="role">I am signing up as: </label>

        {/* select / option components to allow users to choose role */}
        <select 
          className="w-full p-2 my-2 border rounded" 
          name="role" 
          id="role"
          onChange={handleChange}
          >
          <option value=""></option>
          <option value="agent">Real estate agent</option>
          <option value="customer">Customer</option>
        </select>
        {errors.role && <p className='text-sm text-red-500'>{errors.role}</p>}
        <button
          type='submit'
          className='w-full p-2 text-white bg-green-600 rounded'
          >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
