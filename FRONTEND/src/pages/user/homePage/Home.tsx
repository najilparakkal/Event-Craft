import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { fetchServices } from '../../../API/services/user/Services';
import Header from '../../../compounents/user/Header';

interface Service {
  _id: string;
  name: string;
  image: string;
  registered: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const getServices = async () => {
      const servicesList: Service[] = await fetchServices();
      setServices(servicesList);
    };
    getServices();
  }, []);

  const handleServiceClick = (serviceName: string) => {
    navigate(`/vendors/${serviceName}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
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
      <Header />

      <main>
        <section className="relative">
          <img src="/user/pexels-emma-bauso-1183828-3585806.jpg" alt="Wedding" className="w-full h-[450px] sm:h-[550px] object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end items-center text-white pb-8 sm:pb-12 px-4">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-center">India's Largest <span className="text-red-500">Wedding Services</span> Marketplace</h2>
            <p className="text-base sm:text-lg mb-4 sm:mb-6">(For Delhi Services only)</p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4 sm:mb-8 w-full max-w-xl">
              <input type="text" placeholder="Search for vendors" className="px-4 py-2 rounded-md bg-gray-300 text-black placeholder-gray-700 w-full sm:flex-1" />
              <input type="text" placeholder="Search for location" className="px-4 py-2 rounded-md bg-gray-300 text-black placeholder-gray-700 w-full sm:flex-1" />
              <button className="bg-red-500 text-white px-6 py-2 rounded-md w-full sm:w-auto">Find Vendors</button>
            </div>
          </div>
        </section>

        <section className="container mx-auto py-10 px-8">
          <h3 className="text-2xl font-bold mb-8 text-center sm:text-left text-white">Services</h3>
          {Array.isArray(services) && services.length > 0 ? (
            <Slider {...settings}>
              {services.map((service) => (
                <div
                  key={service._id}
                  className="relative bg-gray-300 p-1 shadow-md text-center cursor-pointer"
                  onClick={() => handleServiceClick(service.name)}
                >
                  <img src={service.image} alt={service.name} className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h4 className="text-lg font-bold text-white">{service.name}</h4>
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

export default React.memo(Home);
