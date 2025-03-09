import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {

  // role added to the formData state
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post('/api/auth/register', formData);
      alert('Registration successful. Please log in.');
      navigate('/login');
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
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className='w-full p-2 mb-4 border rounded'
        />
        <input
          type='email'
          placeholder='Email'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className='w-full p-2 mb-4 border rounded'
        />
        <input
          type='password'
          placeholder='Password'
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className='w-full p-2 mb-4 border rounded'
        />
        <label htmlFor="roles">I am signing up as: </label>

        {/* select / option components to allow users to choose role */}
        <select 
          className="w-full p-2 mb-4 border rounded" 
          name="roles" 
          id="roles" 
          onChange={(e) => 
            setFormData({...formData, role: e.target.value})
            }
        >
          <option value=""></option>
          <option value="agent">Real estate agent</option>
          <option value="customer">Customer</option>
        </select>
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
