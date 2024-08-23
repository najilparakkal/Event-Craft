import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface Vendor {
  _id: string;
  vendorName: string;
  profilePicture: string;
}

interface SidebarProps {
  vendors: Vendor[];
  onVendorClick: (vendor: Vendor) => void;
  sidebarOpen: boolean;
  toggleSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ vendors, onVendorClick, sidebarOpen }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVendors = vendors.filter(vendor =>
    vendor.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`h-full text-white rounded-md border-white transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'w-64 md:w-1/3' : 'w-0 overflow-hidden'} md:w-1/4 lg:w-1/5`}>
      <div className="flex items-center justify-between p-4 bg-black border-white border-b-2">
        {searchOpen ? (
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full  border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-white"
          />
        ) : (
          <h1 className="text-lg font-bold">Chats</h1>
        )}
        <div onClick={() => setSearchOpen(!searchOpen)} className="cursor-pointer">
          <FaSearch />
        </div>
      </div>
      <ul className="h-full overflow-y-auto border-white border-t border-b">
        {filteredVendors.map(vendor => (
          <li
            key={vendor._id}
            className="p-4 cursor-pointer hover:bg-gray-600 border-b border-gray-700 flex items-center"
            onClick={() => onVendorClick(vendor)}
          >
            <img src={vendor.profilePicture} alt={vendor.vendorName} className="w-8 h-8 rounded-full mr-3" />
            <span>{vendor.vendorName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Sidebar);
