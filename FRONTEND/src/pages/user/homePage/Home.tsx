import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main>
        <section className="relative">
          <img src="/user/pexels-valeriya-18573170.jpg" alt="Wedding" className="w-full h-[450px] sm:h-[550px] object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end items-center text-white pb-8 sm:pb-12 px-4">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-center">India's Largest <span className="text-red-500">Wedding Services</span> Marketplace</h2>
            <p className="text-base sm:text-lg mb-4 sm:mb-6">(For Delhi Services only)</p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4 sm:mb-8">
              <input type="text" placeholder="Search for vendors" className="px-4 py-2 rounded-md bg-gray-300 text-black placeholder-gray-700 w-full sm:w-auto" />
              <input type="text" placeholder="Search for location" className="px-4 py-2 rounded-md bg-gray-300 text-black placeholder-gray-700 w-full sm:w-auto" />
              <button className="bg-red-500 text-white px-6 py-2 rounded-md w-full sm:w-auto">Find Vendors</button>
            </div>
          </div>
        </section>

        <section className="container mx-auto py-12 px-4">

          <h3 className="text-2xl font-bold mb-8 text-center sm:text-left text-white">Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-gray-300 p-1 rounded-lg shadow-md text-center cursor-pointer"
                onClick={() => handleServiceClick(service.name)}
              >
                <img src={service.image} alt={service.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h4 className="text-lg font-bold">{service.name}</h4>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default React.memo(Home);
