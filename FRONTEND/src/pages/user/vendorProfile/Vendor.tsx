import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { addRequest, fetchVendorDetails } from '../../../API/services/user/Services';
import Header from '../../../compounents/user/Header';
import { useAppSelector } from '../../../costumeHooks/costum';

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

    useEffect(() => {
        const fetch = async () => {
            const details = await fetchVendorDetails(id + "");
            setVendorDetails(details);
        };
        fetch();
    }, [id]);
    console.log(vendorDetails, "🍽️🍽️");

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

    useEffect(() => {
        if (vendorDetails) {
            setMessage(`Hi ${vendorDetails.vendorName}, I would like to connect with you regarding your services.`);
        }
    }, [vendorDetails]);

    if (!vendorDetails) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (value: string) => {
        setMessage(value);
        setValidationError('');
    };

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
                        <button className="bg-[#FEE5EB] text-white py-1 px-2 rounded-md">BOOKING</button>
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

            {/* Post Details Section */}
            <div className="w-full max-w-6xl p-6">
                <h2 className="text-white text-2xl mb-4">Posts</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {vendorDetails.posts.map((post, index) => (
                        <div key={index} className="grid gap-4">
                            {post.images.map((image, imgIndex) => (
                                <div key={imgIndex}>
                                    <img className="h-auto max-w-full rounded-lg" src={image} alt={post.title} />
                                </div>
                            ))}
                            <div className="text-white mt-2">
                                <h3 className="font-semibold">{post.title}</h3>
                                <p>{post.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div id="default-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-2xl max-h-full  rounded-lg shadow bg-[#FD8FAA]">
                        <div className="flex items-center justify-between p-4 rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Send Message to {vendorDetails.vendorName}</h3>
                        </div>
                        <div className="p-4 space-y-4">
                            <input
                                required
                                type="text"
                                value={message}
                                onChange={(e) => handleInputChange(e.target.value)}
                                className="w-full p-2 rounded bg-[#FEE5EB] dark:text-black dark:border-gray-600"
                            />
                            {validationError && <p className="text-red-500">{validationError}</p>}
                        </div>
                        <div className="flex items-center  rounded-b dark:border-gray-600">
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSend}>Send</button>
                            <button type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-red-500 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default React.memo(Vendor);
