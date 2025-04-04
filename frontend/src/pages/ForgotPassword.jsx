import { useState } from 'react';
import axiosInstance from '../axiosConfig';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    const {value} = e.target;
    setEmail(value);
  }

  /* Send request to the server to receive reset email generated in the server */
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axiosInstance.post('api/auth/forgot-password', {email});
      
      const data = response.data;
      alert(data.message);
    } catch(error) {
      alert("Sending reset link failed!");
    }
  };

  return (
    <div className='max-w-md min-h-screen mx-auto mt-20'>
      <h2 className='mb-4 text-2xl font-bold text-center'>
        Forgot Your Password?
      </h2>
      <form className='p-6 bg-white rounded shadow-md' onSubmit={handleSubmit}>
        <input
          type='email'
          className='w-full p-2 mb-4 border rounded'
          placeholder='Enter your email'
          value={email}
          onChange={handleChange}
          required
        />
        <button
          type='submit'
          className='w-full p-2 text-white bg-blue-600 rounded'
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
