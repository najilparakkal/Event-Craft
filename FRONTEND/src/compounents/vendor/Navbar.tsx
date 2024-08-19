import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../costumeHooks/costum';
import { vendorLogout } from '../../API/services/vendor/vendorAuthService';
import { Toaster } from 'react-hot-toast';
import Enquery from './Evquery';

const Navbar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { _id, profilePicture, name } = useAppSelector((state) => state.vendor.vendorDetails);
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    switch (location.pathname) {
      case '/vendor/addPost':
        setSelectedMenuItem('ADD POST');
        break;

      case '/vendor/messages':
        setSelectedMenuItem('MESSAGES');
        break;
      case '/vendor/enquery':
        setSelectedMenuItem('ENQUERY');
        break;
      case '/vendor/home':
        setSelectedMenuItem('DASHBOARD');
        break;
      case '/vendor/services':
        setSelectedMenuItem('ADD SERVICES');
        break;
      case '/vendor/about':
        setSelectedMenuItem('ABOUT US');
        break;
      default:
        setSelectedMenuItem('');
        break;
    }
  }, [location.pathname]);

  const handleMenuItemClick = (menuItem: string, navigateTo: string) => {
    setSelectedMenuItem(menuItem);
    navigate(navigateTo);
    setSidebarOpen(false);
  };

  const logout = vendorLogout();

  const logoutHandler = () => {
    logout();
    navigate('/vendor/login');
  };

  const handleEnqueryClick = () => {
    setModalOpen(true);
    setSidebarOpen(false);
  };
  return (
    <div className="m-1 shadow-md z-50  rounded-lg p-4 flex justify-between items-center bg-white">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex items-center">
        <img src="/black.png" alt="Logo" className="h-8 w-[160px] cursor-pointer" />
      </div>

      <div className="flex items-center">
        <div className="relative ml-4">
          {isSidebarOpen && (
            <div id="dropdownNotification" className="z-20 absolute right-0 mt-2 w-300 max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton">
              <div className="divide-y divide-gray-100 dark:divide-gray-700"></div>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="relative flex items-center justify-between w-full py-1 gap-5 px-4 text-left rounded-lg shadow-md backdrop-blur-lg    focus:outline-none focus:ring-2 focus:ring-indigo-500  ease-in-out  transition-transform duration-700 hover:scale-105 hover:shadow-2xl"
          aria-expanded={isSidebarOpen}
          aria-controls="sidebar"
        >
          <span className="text-black font-medium truncate transition-transform duration-700 hover:scale-90 hover:shadow-2xl">
            {name ? `${name}` : 'Hello, User'}
          </span>
          <img
            src={profilePicture ? profilePicture : "/default-profile.png"}
            alt="User profile"
            className="h-10 w-10 rounded-full object-cover transition-transform duration-700 hover:scale-90 hover:shadow-2xl"
          />
        </button>
      </div>

      <div className={`fixed right-0 z-50 top-0 w-full sm:w-64 h-full bg-gray-100/55 text-white shadow-md p-4 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setSidebarOpen(false)} className="text-black">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <ul className="mt-4 flex flex-col items-center">
          <li className="mb-4">
            <img onClick={() => navigate('/vendor/profile')} src={profilePicture ? profilePicture : ''} alt="" className="h-20 w-20 rounded-full object-cover cursor-pointer" />
          </li>
          <li
            onClick={() => handleMenuItemClick('DASHBOARD', '/vendor/home')}
            className={`py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500 ${selectedMenuItem === 'DASHBOARD' ? 'bg-[#0092AB] text-white' : ''}`}
          >
            DASHBOARD
          </li>
          <li
            onClick={() => handleMenuItemClick('ADD POST', `/vendor/addPost/${_id}`)}
            className={`py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500 ${selectedMenuItem === 'ADD POST' ? 'bg-[#0092AB] text-white' : ''}`}
          >
            ADD POST
          </li>
          <li
            onClick={() => handleMenuItemClick('ADD SERVICES', `/vendor/services`)}
            className={`py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500 ${selectedMenuItem === 'ADD SERVICES' ? 'bg-[#0092AB] text-white' : ''}`}
          >
            ADD SERVICES
          </li>
          <li
            onClick={() => handleMenuItemClick('MESSAGES', '/vendor/messages')}
            className={`py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500 ${selectedMenuItem === 'MESSAGES' ? 'bg-[#0092AB] text-white' : ''}`}
          >
            MESSAGES
          </li>
          <li
            onClick={handleEnqueryClick}
            className={`py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500 ${selectedMenuItem === 'ENQUERY' ? 'bg-[#0092AB] text-white' : ''}`}
          >
            ENQUERY
          </li>

          <li
            onClick={() => handleMenuItemClick('CHANGE PASSWORD', '/vendor/about')}
            className={`py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500 ${selectedMenuItem === ' ABOUT US' ? 'bg-[#0092AB] text-white' : ''}`}
          >
            ABOUT US
          </li>

          <li onClick={logoutHandler} className="py-2 px-4 hover:bg-[#0092AB] hover:text-black font-bold rounded-lg cursor-pointer text-red-600 transition-colors duration-500">
            LOGOUT
          </li>
        </ul>
      </div>
      <Enquery isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

    </div>
  );
};

export default Navbar;
