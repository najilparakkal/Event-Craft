import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Messages from './Messages';
import { useAppSelector } from '../../../../costumeHooks/costum';
import ProfileHeader from '../../../../compounents/user/ProfileHeader';
import { useSocket } from '../../../../API/services/outer/SocketProvider';

interface Vendor {
  _id: string;
  vendorName: string;
  profilePicture: string;
}

const MessageSection: React.FC = () => {
  const { _id } = useAppSelector((state)=>state.user.userDetails);
  const { socket } = useSocket();
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [vendors, setVendors] = useState<Vendor[]>([]);

  const handleVendorClick = (vendor: Vendor) => {
    setSelectedVendor(vendor);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (socket) {
      socket.emit("list_vendors", _id);

      const handleSortedList = (data: Vendor[]) => {
        setVendors(data);
      };

      socket.on("sorted_list", handleSortedList);
      return () => {
        socket.off("sorted_list", handleSortedList);
      };
    }
  }, [socket, _id,vendors]); 

  return (
    <div className="overflow-hidden bg-gray-200">
      <ProfileHeader />
      <div className="flex ml-1 mr-1 rounded-lg shadow-lg bg-black h-[calc(100vh-5rem)]">
        <Sidebar
          vendors={vendors}
          onVendorClick={handleVendorClick}
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Messages
          selectedVendor={selectedVendor}
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>
    </div>
  );
};

export default React.memo(MessageSection);
