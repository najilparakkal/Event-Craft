import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OuterPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-black shadow-lg">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          {/* Adjust the height of the logo to match the text height */}
          <img src="src/assets/logo-no-background.png" className="h-8 sm:h-8" alt="Event Planner Logo" />
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-white">Vendors</a>
            <a href="#" className="text-gray-600 hover:text-white">Blogs</a>
            <a href="#" className="text-gray-600 hover:text-white">Search</a>
            <a onClick={() => navigate("/vendor/login")} className="text-gray-600 hover:text-white cursor-pointer">Become a Vendor?</a>
            <a onClick={() => navigate("/login")} className="text-gray-600 hover:text-white cursor-pointer">Login</a>
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

      <main>
        <section className="relative">
          <img src="src/assets/outerPage/pexels-emma-bauso-1183828-2253870.jpg" alt="Wedding" className="w-full h-[450px] sm:h-[550px] object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end items-center text-white pb-8 sm:pb-12 px-4">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-center">India's Largest <span className="text-red-500">Wedding Services</span> Marketplace</h2>
            <p className="text-base sm:text-lg mb-4 sm:mb-6">(For Delhi Services only)</p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4 sm:mb-8">
              <input type="text" placeholder="Search for vendors" className="px-4 py-2 rounded-md bg-gray-300 text-black placeholder-gray-700 w-full sm:w-auto"/>
              <input type="text" placeholder="Search for location" className="px-4 py-2 rounded-md bg-gray-300 text-black placeholder-gray-700 w-full sm:w-auto"/>
              <button className="bg-red-500 text-white px-6 py-2 rounded-md w-full sm:w-auto">Find Vendors</button>
            </div>
          </div>
        </section>

        <section className="container mx-auto py-12 px-4">
          <h3 className="text-2xl font-bold mb-8 text-center sm:text-left">Vendor categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Decorations', price: '30.00', img: 'src/assets/outerPage/pexels-arunodhai-568948.jpg' },
              { title: 'Planners', price: '34.00', img: 'src/assets/outerPage/pexels-divinetechygirl-1181366.jpg' },
              { title: 'Mehendi Artists', price: '13.00', img: 'src/assets/outerPage/pexels-rarayna-13102907.jpg' },
              { title: 'Jewellery', price: '22.00', img: 'src/assets/outerPage/pexels-jamalyahyayev-4961963.jpg' },
              { title: 'Catering Services', price: '25.00', img: 'src/assets/outerPage/pexels-jonathanborba-18853367.jpg' },
              { title: 'Photographers', price: '11.00', img: 'src/assets/outerPage/pexels-photosbyrakesh-318651.jpg' },
            ].map((category, index) => (
              <div key={index} className="bg-gray-300 p-1 rounded-lg shadow-md text-center">
                <img src={category.img} alt={category.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h4 className="text-lg font-bold">{category.title}</h4>
                <p className="text-gray-600">{category.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default OuterPage;
