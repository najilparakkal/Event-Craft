import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../API/services/user/userAuthService';
import { Toaster } from 'react-hot-toast';
import { useAppSelector } from '../../costumeHooks/costum';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const handleLogout = useLogout();

    const logoutBtn = async () => {
        handleLogout();
        navigate("/login");
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-transparent absolute top-0 left-0 w-full z-10">
                <Toaster position="top-center" reverseOrder={false} />
            <div className="container mx-auto py-4 px-6 flex justify-between items-center">
                <img src="/logo-no-background.png" className="h-8 sm:h-8" alt="Event Planner Logo" />
                <nav className="hidden md:flex space-x-4">
                    <a onClick={() => navigate('/vendors')} className="text-gray-600 hover:text-white">Vendors</a>
                    <a onClick={()=>navigate("/messages")} className="text-white hover:text-gray-600">Messages</a>
                    <a onClick={()=>navigate("/wishlist")} className="text-white hover:text-gray-600">Profile</a>
                    <a onClick={() => navigate("/vendor/login")} className="text-white hover:text-gray-600 cursor-pointer">Become a Vendor?</a>
                    <a onClick={logoutBtn} className="text-red-600 font-semibold hover:text-gray-600 cursor-pointer">Logout</a>
                </nav>
                <button className="md:hidden text-white" onClick={toggleMobileMenu}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
            {isMobileMenuOpen && (
                <nav className="md:hidden bg-black px-6 py-4">
                    <a href="#" className="block text-gray-600 hover:text-white mb-2">Vendors</a>
                    <a onClick={()=>navigate("/messages")} className="block text-gray-600 hover:text-white mb-2">Messages</a>
                    <a href="#" className="block text-gray-600 hover:text-white mb-2">Profile</a>
                    <a onClick={() => navigate("/vendor/login")} className="block text-gray-600 hover:text-white mb-2 cursor-pointer">Become a Vendor?</a>
                    <a onClick={() => navigate("/login")} className="block text-gray-600 hover:text-white cursor-pointer">Login</a>
                </nav>
            )}
        </header>
    );
};

export default Header;
