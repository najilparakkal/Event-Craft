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
        <div className="min-h-screen bg-gray-200 flex flex-col items-center" style={{
            background: 'url(/vendor/servicePage/pexels-photo-9334967.webp) no-repeat center center/cover',
        }}>
            <header className="w-full">
                <div className="container mx-auto py-4 px-6 flex justify-between items-center">
                    <img src="/logo-no-background.png" className="h-8 sm:h-8" alt="Event Planner Logo" />
                </div>
            </header>
            <main className="flex flex-col items-center">
                <h2 className="text-xl font-extrabold text-black">Choose your service...</h2>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4 sm:mb-8">
                    <input
                        type="text"
                        placeholder="Search services"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-20 py-2 rounded-md bg-gray-300 text-black placeholder-gray-700 w-full sm:w-auto"
                        style={{ textAlign: 'center', paddingBottom: '0.5rem' }}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-9">
                    {filteredServices.map((service: { id: number, name: string, image: string }) => (
                        <div
                            key={service.id}
                            onClick={() => handleServiceClick(service.name)}
                            className={`relative bg-gray-300 p-1 shadow-md text-center cursor-pointer w-40 h-40 ${selectedServices.includes(service.name) ? 'border-4 border-[#0092AB]' : ''}`}
                        >
                            <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                                <h4 className="text-lg font-bold text-white">{service.name}</h4>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center w-full">
                    <button
                        onClick={handleNextClick}
                        className="py-3 w-1/4 bg-[#ECD75D] hover:bg-gray-100 hover:text-black text-white font-bold rounded-full transition duration-200"
                    >
                        NEXT
                    </button>
                </div>
            </main>
        </div>
    );
};

export default React.memo(Services);
