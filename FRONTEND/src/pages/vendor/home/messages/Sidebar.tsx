import React from 'react';

interface User {
  _id: string;
  userName: string;
  profilePicture: string;
}

interface SidebarProps {
  users: User[];
  onUserClick: (user: User) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ users, onUserClick, sidebarOpen, toggleSidebar }) => {
  return (
    <div className={`h-[550px] bg-[#edebeb] text-black border-white border-2 rounded-md transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'w-1/3' : 'w-0 overflow-hidden'}`}>
      <div className="flex items-center justify-between p-2  border-b border-gray-800  bg[#edebeb]">
        <h1 className="text-lg font-bold">Chats</h1>
      </div>
      <ul className="">
        {users.map(user => (
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