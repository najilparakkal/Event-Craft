import React from 'react';
import { useNavigate } from 'react-router-dom';

const OuterPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Become a Vendor ?
      </button>
      <button
        onClick={() => navigate("/login")}
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
      >
        Login User
      </button>
    </div>
  );
};

export default OuterPage;
