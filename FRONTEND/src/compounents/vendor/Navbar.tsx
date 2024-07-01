import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../costumeHooks/costum';
import { vendorLogout } from '../../API/services/vendor/vendorAuthService';
import { Toaster } from 'react-hot-toast';

const Navbar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const logout = vendorLogout();
  const logoutHandler = () => {
    logout();
    navigate('/vendor/login');
  };
  const { _id, profilePicture } = useAppSelector((state) => state.vendor.vendorDetails);
  return (
    <div className="bg-gray-400 m-1 shadow-md rounded-lg p-4 flex justify-between items-center" style={{ backgroundColor: "#0092AB" }}>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex items-center">
        <img src="/logo-no-background.png" alt="Logo" className="h-8 w-18" />
        <nav className="ml-4">
          <a onClick={() => navigate("/vendor/home")} className="text-gray-800 font-semibold px-3 py-2 rounded-md hover:text-blue-600 hover:underline">Dashboard</a>
          <a onClick={()=>navigate("/vendor/services")} className="text-gray-600 font-semibold px-3 py-2 rounded-md hover:text-blue-600 hover:underline">ADD Services</a>
          <a href="#" className="text-gray-600 font-semibold px-3 py-2 rounded-md hover:text-blue-600 hover:underline">Bookings</a>
          <a href="#" className="text-gray-600 font-semibold px-3 py-2 rounded-md hover:text-blue-600 hover:underline">About Us</a>
        </nav>
      </div>
      <div className="flex items-center">
        <div className="relative ml-4">
          {isSidebarOpen && (
            <div id="dropdownNotification" className="z-20 absolute right-0 mt-2 w-300 max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton">
              <div className="divide-y divide-gray-100 dark:divide-gray-700">

              </div>
            </div>
          )}
        </div>
        <img
          src={profilePicture !== null && profilePicture !== undefined ? profilePicture : ''}
          alt="User"
          className="ml-4 h-10 w-10 rounded-full cursor-pointer"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        />
      </div>

      <div
        className={`fixed right-0 rounded-lg m-1 top-0 w-64 h-full bg-gray-100/55 text-white shadow-md p-4 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >

        <button onClick={() => setSidebarOpen(false)} className="text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <ul className="mt-4 flex flex-col">
          <li className="mb-4  justify-end">
            <img

              src={profilePicture !== null && profilePicture !== undefined ? profilePicture : ''}
              alt=""
              className='h-20 w-20 rounded-full ml-[74px] object-cover'
            />
          </li>
          <li
            onClick={() => navigate(`/vendor/addPost/${_id}`)}
            className="py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500"
          >
            ADD POST
          </li>
          <li className="py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500">
            REQUESTS
          </li>
          <li className="py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500">
            MESSAGES
          </li>
          <li className="py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500">
            REPORTS
          </li>
          <li className="py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500">
            CHANGE PASSWORD
          </li>
          <li className="py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500">
            ADD ACCOUNT
          </li>
          <li
            onClick={logoutHandler}
            className="py-2 px-4 hover:bg-[#0092AB] hover:text-black font-bold rounded-lg cursor-pointer text-red-600 transition-colors duration-500"
          >
            LOGOUT
          </li>
        </ul>

      </div>
    </div>
  );
};

export default Navbar;
