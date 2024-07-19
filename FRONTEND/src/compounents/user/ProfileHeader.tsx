import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, To } from 'react-router-dom';
import { useAppSelector } from '../../costumeHooks/costum';
import Profile from './Profile';

const ProfileHeader = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState('MESSAGES');
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { profilePicture } = useAppSelector((state) => state.user.userDetails);
    useEffect(() => {



        switch (location.pathname) {
            case '/wishlist':
                setSelectedMenuItem('WISHLIST');
                break;
            case '/bookings':
                setSelectedMenuItem('BOOKINGS');
                break;
            case '/requests':
                setSelectedMenuItem('REQUESTS');
                break;
            case '/change-password':
                setSelectedMenuItem('CHANGE PASSWORD');
                break;
            case '/add-account':
                setSelectedMenuItem('ADD ACCOUNT');
                break;
            case '/messages':
            default:
                setSelectedMenuItem('MESSAGES');
                break;
        }
    }, [location.pathname]);

    const handleMenuItemClick = (menuItem: React.SetStateAction<string>, navigateTo: To) => {
        setSelectedMenuItem(menuItem);
        navigate(navigateTo);
        setSidebarOpen(false);
    };

    return (
        <div className="shadow-md p-4 flex justify-between items-center bg-black">
            <div className="flex items-center">
                <img src="/logo-no-background.png" alt="Logo" className="h-8 w-18" />
            </div>
            <div className="flex items-center">
                <div className="relative ml-4">
                    {isSidebarOpen && (
                        <div
                            id="dropdownNotification"
                            className="z-20 absolute right-0 mt-2 w-300 max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
                            aria-labelledby="dropdownNotificationButton"
                        >
                            <div className="divide-y divide-gray-100 dark:divide-gray-700"></div>
                        </div>
                    )}
                </div>
                <a onClick={() => navigate('/home')} className="text-white mr-9 hover:text-white">
                    Home
                </a>
                <img
                    src={profilePicture ? profilePicture : ""}
                    alt="User"
                    className="ml-4 h-10 w-10 rounded-full cursor-pointer"
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                />
            </div>
            <div
                className={`fixed right-0 rounded-lg m-1 top-0 w-64 h-full bg-gray-100/55 text-white shadow-md p-4 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
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
                <ul className="mt-4 flex flex-col">
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
                        onClick={() => handleMenuItemClick('BOOKINGS', '/bookings')}
                        className={`py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500 ${selectedMenuItem === 'BOOKINGS' ? 'bg-[#0092AB] text-white' : ''}`}
                    >
                        BOOKINGS
                    </li>
                    <li
                        onClick={() => handleMenuItemClick('REQUESTS', '/requests')}
                        className={`py-2 px-4 text-black hover:bg-[#0092AB] hover:text-white font-bold rounded-lg cursor-pointer transition-colors duration-500 ${selectedMenuItem === 'REQUESTS' ? 'bg-[#0092AB] text-white' : ''}`}
                    >
                        REQUESTS
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
                    <li className="mt-[200px] justify-end" onClick={() => setModalOpen(true)}
                    >
                        <img
                            src={profilePicture ? profilePicture : ""}
                            alt=""
                            className='h-20 w-20 rounded-full ml-[74px] object-cover cursor-pointer'
                        />
                    </li>
                </ul>
            </div>

            {isModalOpen && (

                <Profile setModalOpen={()=>setModalOpen(false)} />
            )}

        </div>
    );
};

export default ProfileHeader;
