import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState({password: '', confirmPassword: ''});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      if (newPassword.password === newPassword.confirmPassword) {
        const response = await axiosInstance.post(
          `/api/auth/reset-password/${token}`,
          {newPassword: newPassword.password}
        );
        const data = await response.data;
        alert(data.message);
        navigate('/login');
      }
    } catch(error) {
        alert("Something went wrong!");
        console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setNewPassword((prev) => ({...prev, [name]: value}))
  }

  return (
    <div className='max-w-md min-h-screen mx-auto mt-20'>
      <h2 className='mb-4 text-2xl font-bold text-center'>Reset Password</h2>
      <form className='p-6 bg-white rounded shadow-md' onSubmit={handleSubmit}>
        <input
          type='password'
          name='password'
          className='w-full p-2 mb-4 border rounded'
          placeholder='Enter new password'
          value={newPassword.password}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='confirmPassword'
          className='w-full p-2 mb-4 border rounded'
          placeholder='Re-enter new password'
          value={newPassword.confirmPassword}
          onChange={handleChange}
          required
        />
        <button
          className='w-full p-2 text-white bg-blue-600 rounded'
          type='submit'
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
