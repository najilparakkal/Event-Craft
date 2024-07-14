import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { addRequest, fetchVendorDetails } from '../../../API/services/user/Services';

import Booking from './Booking';

import { useAppSelector } from '../../../costumeHooks/costum';
import Header from '../../../compounents/user/Header';

interface VendorDetails {
    vendorName: string;
    phoneNum: string;
    profilePicture: string;
    businessName: string;
    location: string;
    coverPicture: string;
    posts: { title: string; images: string[]; description: string; category: string }[];
}

const Vendor: React.FC = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [vendorDetails, setVendorDetails] = useState<VendorDetails | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState('');
    const { id } = useParams<{ id: string }>();
    const [validationError, setValidationError] = useState('');
    const { _id } = useAppSelector((state) => state.user.userDetails);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState<VendorDetails['posts']>([]);

    useEffect(() => {
        const fetch = async () => {
            const details = await fetchVendorDetails(id + "");
            setVendorDetails(details);
        };
        fetch();
    }, [id]);

    useEffect(() => {
        if (vendorDetails) {
            setMessage(`Hi ${vendorDetails.vendorName}, I would like to connect with you regarding your services.`);
        }
    }, [vendorDetails]);

    useEffect(() => {
        if (vendorDetails && searchTerm) {
            const filtered = vendorDetails.posts.filter(post => post.category.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredPosts(filtered);
        } else if (vendorDetails) {
            setFilteredPosts(vendorDetails.posts);
        }
    }, [searchTerm, vendorDetails]);

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleSend = async () => {
        if (!message.trim()) {
            setValidationError('Message cannot be empty');
            return;
        }
        const response = await addRequest(message, _id + "", id + "");
        if (response) {
            toast.success('Message sent successfully');
        } else {
            toast.error('You Have already Connected');
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        toast.error('Message sending canceled');
        setIsModalOpen(false);
    };

    const handleInputChange = (value: string) => {
        setMessage(value);
        setValidationError('');
    };

    if (!vendorDetails) {
        return <div>Loading...</div>;
    }


    return (
        <div className="bg-black min-h-screen flex flex-col items-center">
            <Header />
            <main className="w-full max-w-6xl bg-pink-200 mt-[80px] h-[500px] p-6 rounded-lg shadow-lg relative flex flex-col justify-between bg-cover bg-center" style={{ backgroundImage: `url(${vendorDetails.coverPicture})` }}>
                <div className="absolute top-4 right-4 w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <img src={vendorDetails.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="flex-grow">
                    <h2></h2>
                </div>
                <div className="bg-[#FD8FAA] p-2 rounded-lg flex flex-col">
                    <div className="flex justify-between items-start">
                        <div>
                            <h5 className="font-semibold text-white">{vendorDetails.vendorName}</h5>
                            <p className="text-white text-sm">{vendorDetails.businessName}</p>
                        </div>
                        <div className="flex flex-col items-end text-white">
                            <span className="text-sm font-semibold">RATING: 4.5</span>
                            <p className='text-sm'>(12 REVIEWS)</p>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-2 mt-2">
                        <button className="bg-[#FEE5EB] text-white py-1 px-2 rounded-md">CONTACT US</button>
                        <button className="bg-[#FEE5EB] text-white py-1 px-2 rounded-md" onClick={toggleModal}>CHAT WITH ME</button>
                        <button className="bg-[#FEE5EB] text-white py-1 px-2 rounded-md" onClick={() => window.scrollTo(0, window.screen.height)}>BOOKING</button>
                    </div>
                    <div className="flex justify-between ">
                        <a className="text-white px-2 rounded-md flex items-center" onClick={handleFavoriteClick}>
                            ADD TO <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite ? "red" : "currentColor"} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 ml-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </a>
                        <a className="text-white py-1 px-2 rounded-md">WRITE REVIEW</a>
                        <a className="text-red-500 py-2 px-4 rounded-md">REPORT</a>
                    </div>
                </div>
            </main>

            {/* Search Input */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 justify-between sm:space-x-2 mb-4 sm:mb-8 w-full max-w-6xl p-6">
                <h2 className="text-white text-2xl mb-4">Posts</h2>

                <input
                    type="text"
                    placeholder="Search services"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-20 py-2 rounded-md bg-gray-300 text-black placeholder-gray-700 w-full sm:w-auto"
                    style={{ textAlign: 'center', paddingBottom: '0.5rem' }}
                />
            </div>

            <div className="w-full max-w-6xl p-6 mb-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filteredPosts.map((post, index) => (
                        <div key={index} className="grid gap-4">
                            {post.images.map((image, imgIndex) => (
                                <div key={imgIndex}>
                                    <img className="h-auto max-w-full rounded-lg" src={image} alt="" />
                                    <h4 className="text-white font-semibold text-xl mt-2">{post.title}</h4>
                                    <p className="text-white mt-1">{post.description}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Component */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
                        <textarea
                            className="w-full border border-gray-300 rounded-md p-2 mb-2"
                            rows={4}
                            value={message}
                            onChange={(e) => handleInputChange(e.target.value)}
                        />
                        {validationError && <p className="text-red-500 text-sm mb-2">{validationError}</p>}
                        <div className="flex justify-end space-x-2">
                            <button className="bg-gray-300 text-black py-2 px-4 rounded-md" onClick={handleCancel}>Cancel</button>
                            <button className="bg-[#FD8FAA] text-white py-2 px-4 rounded-md" onClick={handleSend}>Send</button>
                        </div>
                    </div>
                </div>
            )}
            <div className='flex w-5/6 '>
                <div className='w-full bg-red-500'>
                    <Booking vendorId={id + ""} />

                </div>

            </div>
            <Toaster />
        </div>
    );
};

export default Vendor;
