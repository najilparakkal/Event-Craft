import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { fetchServices } from '../../API/services/user/Services';

interface Category {
  id: number;
  name: string;
  image: string;
}

const OuterPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const datas = await fetchServices();
      setCategories(datas);
    };
    fetch();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
          autoplaySpeed: 7000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 8000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-black shadow-lg">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <img src="/logo-no-background.png" className="h-8 sm:h-8" alt="Event Planner Logo" />
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
          <img src="/outerPage/pexels-leah-newhouse-50725-540522.jpg" alt="Wedding" className="w-full h-[450px] sm:h-[550px] object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end items-center text-white pb-8 sm:pb-12 px-4">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-center">India's Largest <span className="text-red-500">Event Management</span> Marketplace</h2>
          </div>
        </section>

        <section className="container mx-auto py-10 px-8">
          {/* <h3 className="text-2xl font-bold mb-2 text-center sm:text-left text-white">Vendor categories</h3> */}
          {Array.isArray(categories) && categories.length > 0 ? (
            <Slider {...settings}>
              {categories.map((item) => (
                <div key={item.id} className="relative bg-gray-300 p-1 shadow-md text-center">
                  <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h4 className="text-lg font-bold text-white">{item.name}</h4>
                  </div>
                </div>
              ))}
            </Slider>
          ) : ( 
            <p className="text-white text-center">Loading...</p>
          )}
        </section>

      </main>
    </div>
  );
};

export default React.memo(OuterPage);
