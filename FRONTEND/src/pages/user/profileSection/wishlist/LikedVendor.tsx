import React, { useEffect, useState } from 'react';
import { addVendorLike, fetchLikedVendors } from '../../../../API/services/user/Services';
import { useNavigate } from 'react-router-dom';

interface Prop {
    userId: string;
}

interface Vendor {
    _id: string;
    vendorName: string;
    profilePicture: string;
    coverPicture: string;
    email: string;
    phoneNum: string;
    likes: string[];
}

const LikedVendor: React.FC<Prop> = ({ userId }) => {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [vendorLike, setVendorLike] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const data = await fetchLikedVendors(userId);
                setVendors(data);
                const initialLikedVendors = data
                    .filter(vendor => vendor.likes.includes(userId))
                    .map(vendor => vendor._id);
                setVendorLike(initialLikedVendors);
            } catch (err) {
                console.log(err);
            }
        };
    
        fetchVendors();
    }, [userId]);
    

    const handleFavoriteClick = async (vendorId: string) => {
        try {
            await addVendorLike(userId, vendorId);

            setVendorLike(prevLikedVendors =>
                prevLikedVendors.includes(vendorId)
                    ? prevLikedVendors.filter(id => id !== vendorId)
                    : [...prevLikedVendors, vendorId]
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-wrap gap-4 p-12">
            {vendors.map(vendor => (
                <div
                    key={vendor._id}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white shadow-lg rounded-2xl dark:bg-gray-800"
                >
                    <img
                        alt="cover"
                        src={vendor.coverPicture || '/images/landscape/1.jpg'}
                        className="w-full mb-4 rounded-t-lg h-28 object-cover"
                    />
                    <div className="flex flex-col items-center justify-center p-4 -mt-16">
                        <a href="#" className="relative block">
                            <img
                                alt="profile"
                                src={vendor.profilePicture || '/images/person/1.jpg'}
                                className="mx-auto object-cover rounded-full h-16 w-16"
                            />
                        </a>
                        <p className="mt-2 text-xl font-medium text-gray-800 dark:text-white">
                            {vendor.vendorName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{vendor.email}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{vendor.phoneNum}</p>
                        <a
                            className="text-white px-2 rounded-md flex items-center cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleFavoriteClick(vendor._id);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill={vendorLike.includes(vendor._id) ? "red" : "currentColor"}
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-6 h-6 ml-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                />
                            </svg>
                        </a>
                        <div className="flex items-center justify-between w-full gap-4 mt-8">
                            <button
                                onClick={() => navigate(`/vendorProfile/${vendor._id}`)}
                                type="button"
                                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                            >
                                See profile
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LikedVendor;
