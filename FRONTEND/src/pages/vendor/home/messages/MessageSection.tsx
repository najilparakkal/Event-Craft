import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Messages from './Messages';
import { useAppSelector } from '../../../../costumeHooks/costum';
import Navbar from '../../../../compounents/vendor/Navbar';
import { useSocket } from '../../../../API/services/outer/SocketProvider';

const MessageSection:React.FC = () => {
    const { _id } = useAppSelector((state) => state.vendor.vendorDetails);
    const [selectedUser, setSelectedUser] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [users, setUsers] = useState([]);
    const { socket } = useSocket();

    const handleUserClick = (user:any) => {
        setSelectedUser(user);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        if (socket) {
          socket.emit("list_users", _id);
    
          const handleSortedList = (data:any) => {
            setUsers(data);
          };
    
          socket.on("sorted_user_list", handleSortedList);
          return () => {
            socket.off("sorted_user_list", handleSortedList);
          };
        }
      }, [socket, _id,users]); 


    return (
        <div className='overflow-hidden h-screen '>
            <Navbar />
            <div className="flex ml-1 mr-1 rounded-e-none h-[calc(100vh-5rem)]">
                <Sidebar users={users} onUserClick={handleUserClick} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <Messages selectedUser={selectedUser} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            </div>
        </div>
    );
};

export default React.memo(MessageSection);