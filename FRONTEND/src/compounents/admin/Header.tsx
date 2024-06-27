import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSignInAlt, faBell } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-200 shadow-md">
      <div className="text-2xl font-semibold">Dashboard</div>
      <div className="flex items-center">
        <div className="relative">
          <input type="text" placeholder="Type here..." className="border p-2 rounded" />
          <FontAwesomeIcon icon={faSearch} className="absolute top-2 right-2 text-gray-400" />
        </div>
        <button className="ml-4">
          <FontAwesomeIcon icon={faSignInAlt} />
        </button>
        <button className="ml-4">
          <FontAwesomeIcon icon={faBell} />
        </button>
      </div>
    </div>
  );
};

export default Header;
