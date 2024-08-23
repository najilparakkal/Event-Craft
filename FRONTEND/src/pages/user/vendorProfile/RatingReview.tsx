import React, { useEffect, useState } from 'react';
import { addRatingAndReview, fetchRatingReview } from '../../../API/services/user/Services';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { FaPaperPlane } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import { useAppSelector } from '../../../costumeHooks/costum';

const reviewValidationRegex = /^[\p{L}\p{N}\p{Emoji}\s]+$/u;

interface RatingReviewData {
    vendorName: string;
    about: string;
    ratingAndReview: {
        userId: {
            profilePicture: string;
            userName: string;
        };
        star: number;
        review: string;
    }[];
}

interface VendorService {
    _id: string;
    name: string;
    image: string;
    registered: string;
}

interface RatingReviewProps {
    vendorId: string;
    vendorServices: VendorService[];
}

const RatingReview: React.FC<RatingReviewProps> = ({ vendorId, vendorServices }) => {
    const [vendorData, setVendorData] = useState<RatingReviewData | null>(null);
    const [star, setStar] = useState<number>(0);
    const [review, setReview] = useState<string>('');
    const [visibleReviews, setVisibleReviews] = useState<number>(4);
    const { _id } = useAppSelector((state) => state.user.userDetails);
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        fetchRatingReview(vendorId)
            .then((data) => {
                setVendorData(data);
                setUpdated(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [vendorId, updated]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (star < 1) {
            toast.error("Please select at least one star");
            return;
        }
        if (!reviewValidationRegex.test(review)) {
            toast.error("Review contains invalid characters. Only letters, numbers, and emojis are allowed.");
            return;
        }
        try {
            await addRatingAndReview(_id + "", vendorId, star, review);
            setStar(0);
            setReview('');
            toast.success("Review submitted successfully!");
            setUpdated(true);
        } catch (err) {
            console.log(err);
            toast.error("Failed to submit review");
        }
    };

    const handleShowMore = () => {
        setVisibleReviews(prevVisible => prevVisible + 4);
    };

    const handleShowLess = () => {
        setVisibleReviews(4);
    };

    return (
        <div className="bg-black p-6 shadow-lg rounded-lg text-white max-w-full">
        <Toaster position='top-center' />
        <div>
            <h2 className="text-lg font-bold text-white">About - {vendorData?.vendorName}</h2>
            <p className="text-gray-400 mt-2">{vendorData?.about}</p>
            <div className="mt-4">
                <h3 className="text-md font-semibold text-white">Our Services:</h3>
                <div className="flex flex-wrap mt-2">
                    {vendorServices.map(service => (
                        <div key={service._id} className="flex items-center mr-4">
                            <span className="text-gray-400">{service.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    
        <div className='w-full mt-8'>
            <form className="w-full mx-auto" onSubmit={handleSubmit}>
                <div className="flex flex-wrap items-center w-full mb-5">
                    <div className="relative w-full md:w-4/5">
                        <input
                            type="text"
                            name="floating_review"
                            id="floating_review"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                            placeholder=" "
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                        <label
                            htmlFor="floating_review"
                            className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Review
                        </label>
                    </div>
    
                    <div className="w-full md:w-1/5 pl-4 flex justify-between items-center mt-4 md:mt-0">
                        <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: '4px', padding: '4px' }}>
                            <Rating
                                className='border-why'
                                name="simple-controlled"
                                value={star}
                                onChange={(_event, newStar) => {
                                    setStar(newStar || 0);
                                }}
                                sx={{
                                    color: 'white',
                                    '& .MuiRating-icon': {
                                        border: '1px solid white',
                                        borderRadius: '2px', 
                                    },
                                    '& .MuiRating-iconFilled': {
                                        color: 'white',
                                    },
                                    '& .MuiRating-iconHover': {
                                        color: 'white',
                                    },
                                }}
                            />
                        </Box>
    
                        <button
                            type="submit"
                            className="bg-gray-800 flex text-white p-2 rounded-full hover:bg-gray-700 transition duration-300"
                        >
                            Submit <span className='mt-1'> <FaPaperPlane /> </span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    
        <div className='w-full mt-8'>
            <h3 className="text-md font-semibold text-white mb-4">Ratings and Reviews:</h3>
            {vendorData?.ratingAndReview.length ? (
                <div>
                    {vendorData.ratingAndReview.slice(0, visibleReviews).map((reviewData, index) => (
                        <div key={index} className="mb-4 p-4 border border-gray-600 rounded-lg flex flex-wrap justify-between bg-gray-800">
                            <div className="w-full md:w-4/5 mb-4 md:mb-0">
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Rating
                                        name="read-only"
                                        value={reviewData.star}
                                        readOnly
                                        sx={{
                                            color: 'white',
                                        }}
                                    />
                                    <span className="ml-2 text-gray-400">({reviewData.star} stars)</span>
                                </Box>
                                <p className="text-gray-200 mt-2">{reviewData.review}</p>
                            </div>
                            <div className="w-full md:w-1/5 flex items-center justify-end">
                                <img
                                    src={reviewData.userId?.profilePicture}
                                    alt={reviewData.userId?.userName}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="ml-2 text-gray-200">{reviewData.userId?.userName}</span>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 flex justify-center">
                        {visibleReviews < vendorData?.ratingAndReview.length && (
                            <button
                                onClick={handleShowMore}
                                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300 mr-4"
                            >
                                Show More
                            </button>
                        )}
                        {visibleReviews > 4 && (
                            <button
                                onClick={handleShowLess}
                                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300"
                            >
                                Show Less
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-gray-400">No reviews yet.</p>
            )}
        </div>
    </div>
    
    );
};

export default React.memo(RatingReview);
