import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface User {
  _id: string;
  userName: string;
  profilePicture: string;
}

interface SidebarProps {
  users: User[];
  onUserClick: (user: User) => void;
  sidebarOpen: boolean;
  toggleSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ users, onUserClick, sidebarOpen }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`h-full bg-[#edebeb] text-black border-white border-2 rounded-md transition-transform duration-300 ease-in-out transform 
    ${sidebarOpen ? 'w-full md:w-1/3 lg:w-1/4' : 'w-0 overflow-hidden'} 
    md:w-2/5 lg:w-1/4`}
    >
      <div className="flex items-center justify-between p-2 border-b border-gray-800 bg-[#edebeb]">
        {searchOpen ? (
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-black"
          />
        ) : (
          <h1 className="text-lg font-bold">Chats</h1>
        )}
        <div onClick={handleSearchClick} className="cursor-pointer">
          <FaSearch />
        </div>
      </div>
      <ul className="overflow-y-auto">
        {filteredUsers.map(user => (
          <li
            key={user._id}
            className="p-4 cursor-pointer hover:bg-gray-700 border-b border-white flex items-center"
            onClick={() => onUserClick(user)}
          >
            <img src={user.profilePicture} alt={user.userName} className="w-8 h-8 rounded-full mr-3" />
            <span className='font-bold'>{user.userName}</span>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default React.memo(Sidebar);
