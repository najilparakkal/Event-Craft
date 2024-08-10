import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  const navigate = useNavigate()
  const logout = () => {
    Cookies.remove("adminToken")
    navigate('/admin/login');
  };
  return (
    <div className="flex justify-between items-center p-4 m-2 rounded-md bg-[#292F45] shadow-md">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="text-2xl text-gray-600 font-semibold">{name}</div>
      <div className="flex items-center">

        <button className="ml-4">
          <FontAwesomeIcon className='text-red-600 hover:text-white ' icon={faSignInAlt} onClick={logout} />
        </button>

      </div>
    </div>
  );
};

export default Header;
