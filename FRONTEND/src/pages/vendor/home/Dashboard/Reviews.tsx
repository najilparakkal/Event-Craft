import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../costumeHooks/costum';
import { fetchReviews } from '../../../../API/services/vendor/services';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

interface Review {
  userId: {
    profilePicture: string;
    userName: string;
  };
  star: number;
  review: string;
  _id: string;
}

const Reviews:React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { _id } = useAppSelector((state) => state.vendor.vendorDetails);

  useEffect(() => {
    if (_id) {
      fetchReviews(_id + "")
        .then((data) => {
          setReviews(data);
        })
        .catch((err) => {
          console.error('Fetch error:', err);
        });
    }
  }, [_id]);

  return (
    <div className='h-full w-full'>
      <div className='w-full'>
        <h3 className="text-md font-semibold text-gray-700 mb-4">Ratings and Reviews:</h3>
        {reviews.length > 0 ? (
          <div className="overflow-y-auto scrollNoDiv max-h-96">
            {reviews.map((reviewData) => (
              <div 
                key={reviewData._id} 
                className="mb-4 p-4 shadow-lg rounded-lg flex flex-col md:flex-row justify-between bg-white"
              >
                <div className="w-full md:w-4/5">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating
                      name="read-only"
                      value={reviewData.star}
                      readOnly
                      sx={{ color: 'orange' }}
                    />
                    <span className="ml-2 text-gray-600">({reviewData.star} stars)</span>
                  </Box>
                  <p className="text-gray-800 mt-2">{reviewData.review}</p>
                </div>
                <div className="w-full md:w-1/5 mt-4 md:mt-0 flex flex-col items-start md:items-end">
                  <img
                    src={reviewData.userId?.profilePicture}
                    alt={reviewData.userId?.userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="mt-2 text-gray-700">{reviewData.userId?.userName}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(Reviews);
