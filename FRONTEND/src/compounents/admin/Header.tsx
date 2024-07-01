import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSignInAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import { Toaster } from 'react-hot-toast';

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <div className="flex justify-between items-center p-4 m-2 rounded-md bg-[#292F45] shadow-md">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="text-2xl text-gray-600 font-semibold">{name}</div>
      <div className="flex items-center">
        <div className="relative">
          <FontAwesomeIcon icon={faSearch} className=" hover:text-white  text-gray-600" />
        </div>
        <button className="ml-4">
          <FontAwesomeIcon className='text-gray-600 hover:text-white ' icon={faSignInAlt} />
        </button>
        <button className="ml-4">
          <FontAwesomeIcon className='text-gray-600 hover:text-white ' icon={faBell} />
        </button>
      </div>
    </div>
  );
};

export default Header;
