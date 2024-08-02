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
        <div className="bg-white p-6 shadow-lg rounded-lg">
            <Toaster position='top-center' />
            <div>
                <h2 className="text-lg font-bold text-gray-800">About - {vendorData?.vendorName}</h2>
                <p className="text-gray-600 mt-2">{vendorData?.about}</p>
                <div className="mt-4">
                    <h3 className="text-md font-semibold text-gray-700">Our Services:</h3>
                    <div className="flex flex-wrap mt-2">
                        {vendorServices.map(service => (
                            <div key={service._id} className="flex items-center mr-4">
                                <span className="text-gray-700">{service.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='w-full mt-8'>
                <form className="max-w-full mx-auto" onSubmit={handleSubmit}>
                    <div className="flex items-center w-full mb-5">
                        <div className="relative w-4/5">
                            <input
                                type="text"
                                name="floating_review"
                                id="floating_review"
                                className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                            <label
                                htmlFor="floating_review"
                                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Review
                            </label>
                        </div>

                        <div className="w-1/5 pl-4 flex justify-between items-center">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Rating
                                    name="simple-controlled"
                                    value={star}
                                    onChange={(event, newStar) => {
                                        setStar(newStar || 0);
                                    }}
                                    sx={{
                                        color: 'orange',
                                    }}
                                />
                            </Box>
                            <button
                                type="submit"
                                className="bg-blue-500 flex text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
                            >
                                Submit <span className='mt-1'> <FaPaperPlane /> </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className='w-full mt-8'>
                <h3 className="text-md font-semibold text-gray-700 mb-4">Ratings and Reviews:</h3>
                {vendorData?.ratingAndReview.length ? (
                    <div>
                        {vendorData.ratingAndReview.slice(0, visibleReviews).map((reviewData, index) => (
                            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg flex justify-between">
                                <div className="w-4/5">
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Rating
                                            name="read-only"
                                            value={reviewData.star}
                                            readOnly
                                            sx={{
                                                color: 'orange',
                                            }}
                                        />
                                        <span className="ml-2 text-gray-600">({reviewData.star} stars)</span>
                                    </Box>
                                    <p className="text-gray-800 mt-2">{reviewData.review}</p>
                                </div>
                                <div className="w-1/5 grid items-center justify-end">
                                    <img
                                        src={reviewData.userId?.profilePicture}
                                        alt={reviewData.userId?.userName}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <span className="mr-2 text-gray-700">{reviewData.userId?.userName}</span>
                                </div>
                            </div>
                        ))}
                        <div className="mt-4 flex justify-center">
                            {visibleReviews < vendorData?.ratingAndReview.length && (
                                <button
                                    onClick={handleShowMore}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 mr-4"
                                >
                                    Show More
                                </button>
                            )}
                            {visibleReviews > 4 && (
                                <button
                                    onClick={handleShowLess}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                                >
                                    Show Less
                                </button>
                            )}
                        </div>

                    </div>
                ) : (
                    <p className="text-gray-600">No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default React.memo(RatingReview);
