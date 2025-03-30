import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const handleResize = () => {

      /* in large page viewport set dropdown menu not to open */
      if (window.innerWidth >= 1024) {
        setIsDropdownOpen(false);
      }
    };

    /* read resize event to call the function */
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* on move to another path, set dropdown menu not to open */
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  return (
    <nav className='flex items-center justify-between p-4 text-white bg-blue-600'>
      {/* Logo on small screens, title on large screens */}
      <div className='flex items-center'>
        <Link to='/' className='text-2xl font-bold lg:hidden'>
          {/* Logo for small screens */}
          <img src='/logo.png' alt='Logo' className='h-10' />{' '}
        </Link>
        <Link to='/' className='hidden text-2xl font-bold lg:block'>
          Real Estate Manager {/* Title for large screens */}
        </Link>
      </div>

      {/* Dropdown menu button for small screens */}
      <button
        className='p-2 rounded-md lg:hidden focus:outline-none'
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <svg
          className='w-6 h-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </button>

      {/* Dropdown menu for small screens */}
      <div
        className={`lg:flex ${
          isDropdownOpen ? 'block absolute top-16 left-0 right-0' : 'hidden'
        } bg-blue-600 p-4 lg:p-0 lg:relative lg:flex-1 lg:flex lg:justify-end`}
      >
        <div
          className={`flex flex-col ${
            !isDropdownOpen && 'items-center'
          } lg:flex-row`}
        >
          <Link to='/view-property' className='mb-2 mr-4 lg:mb-0'>
            View Properties
          </Link>
          {user ? (
            <>
              {user.role === 'agent' && (
                <>
                  <Link to='/create-property' className='mb-2 mr-4 lg:mb-0'>
                    Post New Property
                  </Link>
                  <Link to='/my-post' className='mb-2 mr-4 lg:mb-0'>
                    My Property Posts
                  </Link>
                </>
              )}
              <Link to='/saved-post' className='mb-2 mr-4 lg:mb-0'>
                Saved Posts
              </Link>
              <Link to='/profile' className='mb-2 mr-4 lg:mb-0'>
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
              <Link to='/login' className='mb-2 mr-4 lg:mb-0'>
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
      </div>
    </nav>
  );
};

export default Navbar;
