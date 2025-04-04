import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: ''});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      login(response.data);
      navigate('/');
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className='max-w-md min-h-screen mx-auto mt-20'>
      <div className='p-6 bg-white rounded shadow-md'>
        <form
          onSubmit={handleSubmit}
        >
          <h1 className='mb-4 text-2xl font-bold text-center'>Login</h1>
          <input
            type='email'
            placeholder='Email'
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
          <button
            type='submit'
            className='w-full p-2 text-white bg-blue-600 rounded'
          >
            Login
          </button>
        </form>
        {/* Forgot password doesn't work due to google and AWS security reason */}
        {/* <button
          type='button'
          className='w-full p-2 mt-2 text-white bg-orange-600 rounded'
          onClick={() => navigate('/forgot-password')}
        >
          Forgot your password?
        </button> */}
      </div>
    </div>
  );
};

export default Login;
