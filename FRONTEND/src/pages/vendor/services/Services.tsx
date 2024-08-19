import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { getCategories } from '../../../API/services/vendor/services';

const Services: React.FC = () => {
    const navigate = useNavigate();
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleServiceClick = (serviceName: string) => {
        setSelectedServices((prevSelected) =>
            prevSelected.includes(serviceName)
                ? prevSelected.filter((service) => service !== serviceName)
                : [...prevSelected, serviceName]
        );
    };

    useEffect(() => {
        const fetchServices = async () => {
            const datas = await getCategories();
            setServices(datas.response);
        };
        fetchServices();
    }, []);

    const handleNextClick = () => {
        const query = queryString.stringify({ services: selectedServices });
        navigate(`/vendor/license?${query}`);
    };

    const filteredServices = services.filter((service: { name: string }) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col items-center">
            <header className="w-full shadow-xl rounded-lg m-1">
                <div className="container mx-auto py-4 px-6 flex justify-between items-center">
                    <img src="/black.png" className="h-8 w-[160px]" alt="Event Planner Logo" />
                </div>
            </header>
            <main className="flex flex-col items-center w-full">
                <div>
                    <div className="flex justify-between w-full mt-24 px-4 md:px-0">
                        <h2 className="text-xl font-extrabold text-black uppercase">Choose your service...</h2>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 sm:mb-8 w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search services"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-5 py-2 shadow-xl rounded-lg focus:outline-none focus:border-blue-500 w-full sm:w-auto"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-9 px-4 md:px-0">
                        {filteredServices.map((service: { id: number, name: string, image: string }) => (
                            <div
                                key={service.id}
                                onClick={() => handleServiceClick(service.name)}
                                className={`relative bg-gray-300 p-1 shadow-md text-center cursor-pointer ${selectedServices.includes(service.name) ? 'border-4 border-[#0092AB]' : ''}`}
                                style={{ width: '160px', height: '160px' }}  // Add these styles to maintain the current width
                            >
                                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                                    <h4 className="text-lg font-bold text-white">{service.name}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center w-full px-4 md:px-0">
                    <button
                        onClick={handleNextClick}
                        className="py-3 w-full md:w-1/4 shadow-2xl hover:bg-gray-100 hover:text-black text-blue-600 font-bold rounded-full transition duration-200"
                    >
                        NEXT
                    </button>
                </div>
            </main>
        </div>
    );
};

export default React.memo(Services);
