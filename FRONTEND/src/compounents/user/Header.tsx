import React, { useEffect, useState } from 'react';
import { To, useLocation, useNavigate } from 'react-router-dom';
import { useLogout } from '../../API/services/user/userAuthService';
import { Toaster } from 'react-hot-toast';
import { useAppSelector } from '../../costumeHooks/costum';
import Profile from './Profile';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const handleLogout = useLogout();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState('HOME');
    const [isModalOpen, setModalOpen] = useState(false);
    const location = useLocation();
    const { profilePicture, name } = useAppSelector((state) => state.user.userDetails);

    useEffect(() => {
        switch (location.pathname) {
            case '/wishlist':
                setSelectedMenuItem('WISHLIST');
                break;
            case '/bills':
                setSelectedMenuItem('BILLS');
                break;
            case '/messages':
                setSelectedMenuItem('MESSAGES');
                break;
            case '/bookings':
                setSelectedMenuItem('BOOKINGS');
                break;
            case '/change-password':
                setSelectedMenuItem('CHANGE PASSWORD');
                break;
            case '/add-account':
                setSelectedMenuItem('ADD ACCOUNT');
                break;
            default:
                setSelectedMenuItem('HOME');
                break;
        }
    }, [location.pathname]);

    const handleMenuItemClick = (menuItem: string, navigateTo: To) => {
        setSelectedMenuItem(menuItem);
        navigate(navigateTo);
        setSidebarOpen(false);
    };

    const logoutBtn = async () => {
        handleLogout();
        navigate("/login");
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-transparent  top-0 left-0 w-full  z-10 fixed">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="container mx-auto py-4 px-6 flex justify-between items-center">
                <img src="/logo-no-background.png" className="h-8 sm:h-8" alt="Event Planner Logo" />
                <nav className="hidden md:flex space-x-4 ">

                    <button
                        type="button"
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="relative flex items-center justify-between w-full py-1 gap-5 px-4 text-left rounded-lg shadow-md backdrop-blur-lg   focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-150"
                        aria-expanded={isSidebarOpen}
                        aria-controls="sidebar"
                    >
                        <span className="text-white font-medium truncate">
                            {name ? `${name}` : 'Hello, User'}
                        </span>
                        <img
                            src={profilePicture ? profilePicture : "/default-profile.png"}
                            alt="User profile"
                            className="h-10 w-10 rounded-full object-cover"
                        />
                    </button>
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
                    <a onClick={() => navigate("/messages")} className="block text-gray-600 hover:text-white mb-2">Messages</a>
                    <a href="#" className="block text-gray-600 hover:text-white mb-2">Profile</a>
                    <a onClick={() => navigate("/login")} className="block text-gray-600 hover:text-white cursor-pointer">Login</a>
                    <img
                        src={profilePicture ? profilePicture : ""}
                        alt="User"
                        className="ml-4 h-10 w-10 rounded-full cursor-pointer"
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                    />
                </nav>
            )}
            <div
                className={`fixed right-0 top-0 w-64 h-full bg-gray-100/55 text-white shadow-md transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ zIndex: 50 }}
            >
                <div className="flex flex-col h-full p-4">
                    <button onClick={() => setSidebarOpen(false)} className="text-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <ul className="mt-4 flex-grow flex flex-col">
                        <li
                            onClick={() => handleMenuItemClick('HOME', '/home')}
                            className={`py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500 ${selectedMenuItem === 'HOME' ? 'bg-[#0092AB] text-white' : ''}`}
                        >
                            HOME
                        </li>
                        <li
                            onClick={() => handleMenuItemClick('MESSAGES', '/messages')}
                            className={`py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500 ${selectedMenuItem === 'MESSAGES' ? 'bg-[#0092AB] text-white' : ''}`}
                        >
                            MESSAGES
                        </li>
                        <li
                            onClick={() => handleMenuItemClick('WISHLIST', '/wishlist')}
                            className={`py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500 ${selectedMenuItem === 'WISHLIST' ? 'bg-[#0092AB] text-white' : ''}`}
                        >
                            WISHLIST
                        </li>
                        <li
                            onClick={() => handleMenuItemClick('BILLS', '/bills')}
                            className={`py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500 ${selectedMenuItem === 'BILLS' ? 'bg-[#0092AB] text-white' : ''}`}
                        >
                            BILLS
                        </li>
                        <li
                            onClick={() => handleMenuItemClick('BOOKINGS', '/bookings')}
                            className={`py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500 ${selectedMenuItem === 'BOOKINGS' ? 'bg-[#0092AB] text-white' : ''}`}
                        >
                            BOOKINGS
                        </li>
                        <li
                            onClick={() => handleMenuItemClick('CHANGE PASSWORD', '/change-password')}
                            className={`py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500 ${selectedMenuItem === 'CHANGE PASSWORD' ? 'bg-[#0092AB] text-white' : ''}`}
                        >
                            CHANGE PASSWORD
                        </li>
                        <li
                            onClick={() => handleMenuItemClick('ADD ACCOUNT', '/add-account')}
                            className={`py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500 ${selectedMenuItem === 'ADD ACCOUNT' ? 'bg-[#0092AB] text-white' : ''}`}
                        >
                            ADD ACCOUNT
                        </li>
                        <li
                            onClick={() => { handleMenuItemClick('LOGOUT', '/logout'); logoutBtn(); }}
                            className={`py-2 px-4 text-red-600 hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500`}
                        >
                            LOGOUT
                        </li>
                    </ul>
                    <div className="mt-auto flex justify-center">
                        <img
                            src={profilePicture ? profilePicture : ""}
                            alt="User"
                            className="h-20 w-20 rounded-full object-cover cursor-pointer"
                            onClick={() => setModalOpen(true)}
                        />
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <Profile setModalOpen={() => setModalOpen(false)} />
            )}
        </header>
    );
};

export default Header;
