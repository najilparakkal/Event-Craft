import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';

const Services: React.FC = () => {
    const navigate = useNavigate();
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const handleServiceClick = (serviceName: string) => {
        setSelectedServices((prevSelected) =>
            prevSelected.includes(serviceName)
                ? prevSelected.filter((service) => service !== serviceName)
                : [...prevSelected, serviceName]
        );
    };

    const handleNextClick = () => {
        const query = queryString.stringify({ services: selectedServices });
        navigate(`/vendor/license?${query}`);
    };

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center" style={{
            background: 'url(/vendor/servicePage/pexels-ywanphoto-57980.jpg) no-repeat center center/cover',
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
                        className="px-20 py-2 rounded-md bg-gray-300 text-black placeholder-gray-700 w-full sm:w-auto"
                        style={{ textAlign: 'center', paddingBottom: '0.5rem' }}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-9">
                    {[
                        { name: 'PHOTOGRAPHERS', icon: '📸' },
                        { name: 'DECORATERS', icon: '🎉' },
                        { name: 'MEHANDHI', icon: '🫴' },
                        { name: 'DJ', icon: '🎶' },
                        { name: 'CATERING ', icon: '🍽️' },
                        { name: 'vanue', icon: '🏫' },
                        { name: 'PLANNING', icon: '🧠' },
                        { name: 'other', icon: '🕵️‍♀️' }
                    ].map((service, index) => (
                        <div
                        key={index}
                        onClick={() => handleServiceClick(service.name)}
                        className={` bg-opacity-40 backdrop-blur-sm p-8 flex flex-col items-center rounded shadow-lg w-full h-40 cursor-pointer ${selectedServices.includes(service.name) ? 'border-4 border-[#ECD75D]' : ''}`}
                      >
                            <div className="text-4xl">{service.icon}</div>
                            <p className="mt-4 text-center  font-bold text-lg">{service.name}</p>
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
