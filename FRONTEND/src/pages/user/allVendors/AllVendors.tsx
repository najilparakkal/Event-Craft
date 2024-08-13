import React, { useState, useEffect } from 'react';
import { fetchAllVendors } from '../../../API/services/user/Services';
import Header from '../../../compounents/user/Header';
import VendorsCard from '../../../compounents/user/VendorsCard';
import Footer from '../../../compounents/user/Footer';

const AllVendors: React.FC = () => {
    const [vendors, setVendors] = useState<any[]>([]);

    useEffect(() => {
        fetchAllVendors()
            .then((data) => {
                setVendors(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    return (
        <div className="min-h-screen flex flex-col bg-black">
        <Header />
        <div className="flex-grow pt-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto w-full">
                <VendorsCard vendors={vendors} />
            </div>
        </div>
        <Footer />
    </div>
    );
};

export default React.memo(AllVendors);
