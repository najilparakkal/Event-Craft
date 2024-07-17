import React from 'react';

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
  return (
    <div className={`h-full  text-white rounded-md border-white  transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'w-1/3' : 'w-0 overflow-hidden'}`}>
      <div className="flex items-center justify-between p-4 bg-black border-white border-b-2">
        <h1 className="text-lg font-bold ">Chats</h1>
        
      </div>
      <ul className="h-full overflow-y-auto border-white border-1">
        {vendors.map(vendor => (
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

export default Sidebar;