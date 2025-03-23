import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  return (
    <nav className='flex items-center justify-between p-4 text-white bg-blue-600'>
      <Link to='/' className='text-2xl font-bold'>
        Real Estate Manager
      </Link>
      <div>
        <Link to='/view-property' className='mr-4'>
          View Properties
        </Link>
        {user ? (
          <>
            {user.role === 'agent' && (
              <>
                <Link to='/create-property' className='mr-4'>
                  Post New Property
                </Link>
                <Link to='/my-post' className='mr-4'>
                  My Property Posts
                </Link>
              </>
            )}
            <Link to='/saved-post' className='mr-4'>
              Saved Posts
            </Link>
            <Link to='/profile' className='mr-4'>
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className='px-4 py-2 bg-red-500 rounded hover:bg-red-700'
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login' className='mr-4'>
              Login
            </Link>
            <Link
              to='/register'
              className='px-4 py-2 bg-green-500 rounded hover:bg-green-700'
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
