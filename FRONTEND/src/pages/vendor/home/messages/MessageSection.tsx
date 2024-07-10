import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Messages from './Messages';
import { useAppSelector } from '../../../../costumeHooks/costum';
import { fetchUsers } from '../../../../API/services/vendor/services';
import Navbar from '../../../../compounents/vendor/Navbar';

const MessageSection:React.FC = () => {
    const { _id } = useAppSelector((state) => state.vendor.vendorDetails);
    const [selectedUser, setSelectedUser] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [users, setUsers] = useState([]);

    const handleUserClick = (user:any) => {
        setSelectedUser(user);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const fetchAcceptedUsers = async () => {
            try {
                const acceptedUsers = await fetchUsers(_id+"");
                setUsers(acceptedUsers);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAcceptedUsers();
    }, [_id]);

    return (
        <div className='overflow-hidden  '>
            <Navbar />
            <div className="flex ml-1 mr-1 rounded-e-none">
                <Sidebar users={users} onUserClick={handleUserClick} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <Messages selectedUser={selectedUser} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            </div>
        </div>
    );
};

export default React.memo(MessageSection);
