import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Profile = () => {
  const { user } = useAuth(); // Access user token from context
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    agency: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch profile data from the backend
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFormData({
          name: response.data.name,
          email: response.data.email,
          agency: response.data.agency || '',
        });
      } catch (error) {
        alert('Failed to fetch profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put('/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="mt-20 text-center">Loading...</div>;
  }

  return (
    <div className='max-w-md min-h-screen mx-auto mt-20'>
      <form onSubmit={handleSubmit} className='p-6 bg-white rounded shadow-md'>
        <h1 className='mb-4 text-2xl font-bold text-center'>Your Profile</h1>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          type='text'
          placeholder='Name'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className='w-full p-2 mb-4 border rounded'
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          placeholder='Email'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className='w-full p-2 mb-4 border rounded'
        />
        { user.role === 'agent' && (
          <>
            <label htmlFor='agency'>Agency</label>
            <input
              type='text'
              placeholder='Agency'
              value={formData.agency}
              onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
              className='w-full p-2 mb-4 border rounded'
              />
          </>
        )}
        <button
          type='submit'
          className='w-full p-2 text-white bg-blue-600 rounded'
          >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
