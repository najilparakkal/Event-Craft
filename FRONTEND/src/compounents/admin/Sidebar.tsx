import React from 'react';
import { FaTachometerAlt, FaFileInvoiceDollar, FaEnvelopeOpenText, FaStore, FaThList, FaUser } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar: React.FC = ( ) => {
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
        <div className="min-h-screen w-16 bg-[#292F45] shadow-lg flex flex-col items-center py-4">
            <div className="mt-10 space-y-4">
                <nav className="flex flex-col items-center space-y-4">
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
                                className={`flex flex-col items-center justify-center w-full py-3 rounded-lg ${
                                    isActive ? 'bg-[#3A3F51] text-white' : 'text-gray-100 hover:bg-[#3A3F51]'
                                }`}
                            >
                                <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                            </a>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
