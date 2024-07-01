import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../API/services/user/userAuthService';

const Header:React.FC = ()=> {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const handleLogout = useLogout(); 
    const logoutBtn = async ()=>{
      handleLogout();
      navigate("/login");
    }
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };
  return (
    <header className="bg-transparent shadow-lg">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <img src="/logo-no-background.png" className="h-8 sm:h-8" alt="Event Planner Logo" />
          <nav className="hidden md:flex space-x-4">
            <a onClick={()=>navigate('/vendors')} className="text-gray-600 hover:text-white">Vendors</a>
            <a href="#" className="text-gray-600 hover:text-white">Blogs</a>
            <a href="#" className="text-gray-600 hover:text-white">Search</a>
            <a onClick={() => navigate("/vendor/login")} className="text-gray-600 hover:text-white cursor-pointer">Become a Vendor?</a>
            <a onClick={logoutBtn} className="text-red-600 font-semibold hover:text-white cursor-pointer">Logout</a>
          </nav>
          <button className="md:hidden text-gray-600" onClick={toggleMobileMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-black px-6 py-4">
            <a href="#" className="block text-gray-600 hover:text-white mb-2">Vendors</a>
            <a href="#" className="block text-gray-600 hover:text-white mb-2">Blogs</a>
            <a href="#" className="block text-gray-600 hover:text-white mb-2">Search</a>
            <a onClick={() => navigate("/vendor/login")} className="block text-gray-600 hover:text-white mb-2 cursor-pointer">Become a Vendor?</a>
            <a onClick={() => navigate("/login")} className="block text-gray-600 hover:text-white cursor-pointer">Login</a>
          </nav>
        )}
      </header>
  )
}

export default Header
