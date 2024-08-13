import React from 'react';
import {
    FaTachometerAlt,
    FaFileInvoiceDollar,
    FaEnvelopeOpenText,
    FaStore,
    FaThList,
    FaUser,
    FaFileAlt
} from 'react-icons/fa';
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
        { name: 'Reports', icon: FaFileAlt, path: '/admin/Reports' },
    ];

    return (
        <div className="min-h-screen w-10 bg-[#292F45] shadow-lg flex flex-col items-center py-4 sm:w-12 md:w-12 lg:w-12">
            <div className="mt-10 space-y-4">
                <nav className="flex flex-col items-center space-y-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <div key={item.name} className="group relative">
                                <a
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(item.path);
                                    }}
                                    className={`flex flex-col items-center justify-center w-full py-3 rounded-lg ${
                                        isActive ? 'bg-[#3A3F51] text-white' : 'text-gray-100 hover:bg-[#3A3F51]'
                                    }`}
                                >
                                    <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                </a>
                                <span className="absolute z-20 left-full ml-2 transform -translate-y-1/2 bg-gray-700 text-white text-sm font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                    {item.name}
                                </span>
                            </div>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
