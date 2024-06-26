import React from 'react';

const License: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-200" style={{ background: '#CFCAC9' }}>
            <header className=" w-full" >
                <div className="container mx-auto py-4 px-6 flex justify-between items-center">
                    <img src="/logo-no-background.png" className="h-8 sm:h-8" alt="Event Planner Logo" />


                </div>

            </header>

            <main className="flex flex-col items-center mt-10">
                <h2 className="text-m font-bold mb-6">PLEASE SUBMIT YOUR LICENSES OR EXPERIENCE CERTIFICATES</h2>

                <div className="bg-gray-500 p-8 rounded-lg flex  justify-around w-full max-w-3xl">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="bg-gray-300 w-32 h-32 m-2 flex items-center justify-center rounded shadow-lg">
                            <span className="text-4xl font-bold">+</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center w-full mt-3">
                    <button className="py-2 px-7 bg-blue-500 text-white font-bold rounded transition duration-200 hover:bg-pink-400">
                        SUBMIT
                    </button>
                </div>
            </main>
        </div>
    );
};

export default License;
