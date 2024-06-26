import React from 'react';
import { FaTachometerAlt, FaFileInvoiceDollar, FaEnvelopeOpenText, FaStore, FaThList, FaUser, FaGem } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', icon: FaTachometerAlt, path: '/admin/Dashboard' },
        { name: 'Users', icon: FaUser, path: '/admin/Users' },
        { name: 'Vendors', icon: FaStore, path: '/admin/Vendors' },
        { name: 'Categories', icon: FaThList, path: '/admin/Categories' },
        { name: 'Requests', icon: FaEnvelopeOpenText, path: '/admin/Requests' },
        { name: 'Payments', icon: FaFileInvoiceDollar, path: '/admin/Payments' },
    ];

    return (
        <div className="min-h-screen w-50 bg-blue-100 shadow-lg">
          <div className="flex items-center px-4 py-4">
                <img src="/black.png" alt="EVENT CRAFT Logo" className="w-13 h-5" />
            </div>
            <div className="mt-10">
                <nav className="flex flex-col space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <a
                                key={item.name}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(item.path);
                                }}
                                className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                                    isActive ? 'bg-white shadow-md text-gray-800' : 'text-gray-800 hover:bg-gray-100'
                                }`}
                            >
                                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-red-600' : 'text-blue-400'}`} />
                                {item.name}
                            </a>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
