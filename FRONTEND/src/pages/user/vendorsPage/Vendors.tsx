import React, { useEffect, useState } from 'react';
import { fetchVendors } from '../../../API/services/user/Services';
import { Pagination } from '@mui/material';
import Header from '../../../compounents/user/Header';
import { useParams } from 'react-router-dom';

interface Vendor {
    _id: string;
    vendorName: string;
    email: string;
    profilePicture: string;
}

const Vendors: React.FC = () => {
    const { service } = useParams<{ service: string }>();
    
    const [vendorsList, setVendorsList] = useState<Vendor[]>([]);
    const [page, setPage] = useState(1);
    const vendorsPerPage = 9;

    useEffect(() => {
        const vendors = async () => {
            const list: Vendor[] = await fetchVendors(service+"");
            setVendorsList(list);
        };
        vendors();
    }, []);

    const handlePageChange = (event: React.ChangeEvent<unknown>|null, value: number) => {
        setPage(value);
    };

    const paginatedVendors = vendorsList.slice((page - 1) * vendorsPerPage, page * vendorsPerPage);

    return (
        <div className="min-h-screen bg-black">
            <Header /> 
            <main>
                <section className="relative">
                    <img src="/user/pexels-valeriya-18573170.jpg" alt="Wedding" className="w-full h-[450px] sm:h-[400px] object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end items-center text-white pb-8 sm:pb-12 px-4">
                        <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-center">India's Largest <span className="text-red-500">{service} </span>Services Marketplace</h2>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4 sm:mb-8">
                            <input type="text" placeholder="Search for location" className="px-4 py-2 rounded-md bg-gray-300 text-black placeholder-gray-700 w-full sm:w-auto" />
                            <button className="bg-red-500 text-white px-6 py-2 rounded-md w-full sm:w-auto">Find Vendors</button>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto py-12 px-4">
                    <h3 className="text-2xl font-bold mb-8 text-center text-white sm:text-left">Vendors</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {paginatedVendors.map((vendor) => (
                            <div key={vendor._id} className="bg-gray-300 p-1 rounded-lg shadow-md text-center">
                                <img src={vendor.profilePicture} alt={vendor.vendorName} className="w-full h-48 object-cover rounded-lg " />
                                <h4 className="text-lg font-bold">{vendor.vendorName}</h4>
                                {/* <p className="text-gray-600">{vendor.email}</p> */}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-8">
                        <Pagination
                            count={Math.ceil(vendorsList.length / vendorsPerPage)}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default React.memo(Vendors);
