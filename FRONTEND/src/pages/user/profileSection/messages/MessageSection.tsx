import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Messages from './Messages';
import { useAppSelector } from '../../../../costumeHooks/costum';
import { fetchVendorsInChat } from '../../../../API/services/user/Services';
import ProfileHeader from '../../../../compounents/user/ProfileHeader';
import { useSocket } from '../../../../API/services/outer/SocketProvider';

interface Vendor {
  _id: string;
  vendorName: string;
  profilePicture: string;
}

const MessageSection: React.FC = () => {
  const { _id } = useAppSelector((state) => state.user.userDetails);

  const {socket} = useSocket() 


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
    const fetchAcceptedVendors = async () => {
      try {
        console.log(socket);
        
        const acceptedVendors = await fetchVendorsInChat(_id + "");
        setVendors(acceptedVendors);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAcceptedVendors();
  }, [_id]);

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

export default MessageSection;