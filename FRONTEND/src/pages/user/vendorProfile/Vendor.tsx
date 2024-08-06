import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { addRequest, addVendorLike, checkRequest, checkUserBooked, fetchVendorDetails } from '../../../API/services/user/Services';
import Slider from 'react-slick';
import Booking from './Booking';
import { useAppSelector } from '../../../costumeHooks/costum';
import Header from '../../../compounents/user/Header';
import RatingReview from './RatingReview';
import { Button, Popover, Typography } from '@mui/material';
import { string } from 'yup';
import Report from './Report';
import Notification from '../../../compounents/user/Notification';

interface VendorDetails {
    _id: string
    vendorName: string;
    phoneNum: string;
    profilePicture: string;
    businessName: string;
    location: string;
    reviewCount: number
    totalStars: number
    coverPicture: string;
    posts: { title: string; images: string[]; description: string; category: string }[];
    likes: string[]
}



const Vendor: React.FC = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [vendorDetails, setVendorDetails] = useState<VendorDetails | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [showBookingMessage, setShowBookingMessage] = useState(false);
    const { id } = useParams<{ id: string }>();
    const [validationError, setValidationError] = useState('');
    const { _id } = useAppSelector((state) => state.user.userDetails);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState<VendorDetails['posts']>([]);
    const [filteredServices, setFilteredServices] = useState<VendorDetails['posts']>([]);
    const [rating, setRating] = useState(0)
    const [bookedVendors, setBookedVendors] = useState<string[]>([]);
    const [chat, setChat] = useState(false)
    const [services, setServices] = useState([])
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [vendoLike, setVendorLike] = useState<string[]>([])
    const [reportModal, setReportModal] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const fetch = async () => {
            const details = await fetchVendorDetails(id + "", _id + "");
            setVendorDetails(details.response);
            setBookedVendors(details.bookings || []);
            setChat(details.chat)
            setServices(details.services)
            rate(details)
            setVendorLike(details.response.likes || []);
        };
        fetch()
    }, [chat, isModalOpen]);
    const rate = (details: any) => {
        if (details.response?.reviewCount && details.response?.totalStars) {
            const value = details.response?.totalStars / details.response?.reviewCount
            const average = value % 1
            if (value > 0 && value <= 0.5) {
                setRating(Math.floor(average) + 0.5)
            } else if (value > 0.5) {
                setRating(Math.ceil(average))
            } else {
                setRating(Math.floor(average));
            }

        }
    }

    useEffect(() => {
        if (searchTerm) {
            const filtered = services.filter((service: any) =>
                service?.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredServices(filtered);
        } else {
            setFilteredServices(services);
        }
    }, [searchTerm, services]);

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


    const handleFavoriteClick = async (vendorId: string) => {
        await addVendorLike(_id + "", vendorId);
        setVendorLike((prevLikedVendor) =>
            prevLikedVendor.includes(_id + "")
                ? prevLikedVendor.filter((id) => id !== _id + "")
                : [...prevLikedVendor, _id + ""]
        );
    };

    const toggleModal = () => {
        if (bookedVendors.length > 0) {
            setIsModalOpen(true);
        } else {
            setShowBookingMessage(true);
        }
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
            toast.error('You have already connected');
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

    const handleCloseBookingMessage = () => {
        setShowBookingMessage(false);
    };

    if (!vendorDetails) {
        return <div>Loading...</div>;
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    autoplay: true,
                    autoplaySpeed: 7000,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 8000,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                },
            },
        ],
    };
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const popId = open ? 'simple-popover' : undefined;

    const isBooked = async () => {
        return await checkUserBooked(_id + "")
    }
    const request = async (vendorId: string) => {
        return await checkRequest(_id + "", vendorId)
    }
    const repModal = () => {
        setReportModal(true)
    }
    return (
        <div className="bg-black min-h-screen flex flex-col items-center">
            <Header />
            <Notification/>

            <main className="w-full max-w-6xl bg-pink-200 mt-[80px] h-[500px] p-6 rounded-lg shadow-lg relative flex flex-col justify-between bg-cover bg-center" style={{ backgroundImage: `url(${vendorDetails.coverPicture})` }}>
                <div className="absolute top-4 right-4 w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <img src={vendorDetails.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="flex-grow">
                    <h2></h2>
                </div>
                <div className="bg-black bg-opacity-50 p-2 rounded-lg flex flex-col">
                    <div className="flex justify-between items-start">
                        <div>
                            <h5 className="font-semibold text-white">{vendorDetails.vendorName}</h5>
                            <p className="text-white text-sm">{vendorDetails.businessName}</p>
                        </div>
                        <div className="flex flex-col items-end text-white">
                            <span className="text-sm font-semibold">RATING: {rating}</span>
                            <p className='text-sm'>({vendorDetails.reviewCount} REVIEWS)</p>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-2 mt-2">
                        <Button aria-describedby={id} variant="outlined" sx={{ backgroundColor: '#1F2937', color: 'white', border: "none" }} onClick={handleClick}>
                            CONTACT US
                        </Button>
                        <Popover
                            id={popId}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Typography sx={{ p: 1 }}>{vendorDetails.phoneNum}</Typography>
                        </Popover>
                        <button
                            className="bg-gray-800 text-white py-1 px-2 rounded-md"
                            onClick={async () => {
                                const booked = await isBooked();

                                if (booked) {
                                    if (chat) {
                                        const requestAccepted = await request(vendorDetails._id);
                                        if (requestAccepted) {
                                            navigate('/messages');
                                        } else {
                                            toast.error("YOUR REQUEST IS NOT ACCEPTED")
                                        }
                                    } else {
                                        toggleModal();
                                    }
                                }
                            }}
                        >
                            CHAT WITH ME
                        </button>
                        <button className="bg-gray-800 text-white py-1 px-2 rounded-md" onClick={() => window.scrollTo(0, window.screen.height)}>BOOKING</button>
                    </div>
                    <div className="flex justify-between ">
                        <a className="text-white px-2 rounded-md flex items-center" onClick={(e) => {
                            e.stopPropagation()
                            handleFavoriteClick(vendorDetails._id)
                        }}>
                            ADD TO <svg xmlns="http://www.w3.org/2000/svg" fill={vendoLike.includes(_id + "") ? "red" : "currentColor"} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 ml-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </a>
                        <a className="text-white py-1 px-2 rounded-md">WRITE REVIEW</a>
                        <a className="text-red-500 py-2 px-4 rounded-md" onClick={repModal}>REPORT</a>

                    </div>
                </div>
            </main>
            <div className="w-full max-w-6xl p-6 mb-10">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 justify-between sm:space-x-2 mb-4 sm:mb-8 w-full max-w-6xl p-6">
                    <h2 className="text-white text-2xl mb-4">Posts & Services</h2>

                    <input
                        type="text"
                        placeholder="Search services"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-20 py-2 rounded-md bg-gray-300 text-black placeholder-gray-700 w-full sm:w-auto"
                        style={{ textAlign: 'center', paddingBottom: '0.5rem' }}
                    />
                </div>
                <Slider {...settings}>
                    {filteredServices.map((service: any) => (
                        <div key={service._id} className="relative bg-gray-300 p-1 shadow-md text-center cursor-pointer">
                            <img src={service.image} alt={service.name} className="w-full h-32 object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <h4 className="text-lg font-bold text-white">{service.name}</h4>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="w-full max-w-6xl p-6 mb-10 ">
                {filteredPosts.length > 0 ? (
                    <div className="flex flex-wrap gap-4">
                        {filteredPosts.map((post, index) => (
                            <div key={index} className="flex flex-col gap-4 w-1/2 md:w-1/4">
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
                ) : (
                    <div className="flex justify-center m-10">
                        <p className="text-white text-center font-bold">No posts found</p>
                    </div>
                )}
                <Booking vendorId={id + ""} />
                <RatingReview vendorId={id + ""} vendorServices={services} />
            </div>


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
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSend}>Send</button>
                            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {showBookingMessage && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Booking Required</h2>
                        <p className="mb-4">Please book the vendor's services before you can send a message.</p>
                        <div className="flex justify-end">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleCloseBookingMessage}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {reportModal && (
                <Report isOpen={reportModal} setReportModal={setReportModal} vendorId={vendorDetails._id}/>
            )}
            <Toaster />
        </div>
    );
};

export default Vendor;
