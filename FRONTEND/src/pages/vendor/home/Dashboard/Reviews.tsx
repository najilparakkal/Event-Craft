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

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { _id } = useAppSelector((state) => state.vendor.vendorDetails);

  useEffect(() => {
    if (_id) {
      fetchReviews(_id + "")
        .then((data) => {
          console.log('Fetched data:', data); // Debugging: Check fetched data
          setReviews(data); // Store the array directly
        })
        .catch((err) => {
          console.log('Fetch error:', err);
        });
    }
  }, [_id]);

  console.log('reviews state:', reviews); // Debugging: Check state before rendering

  return (
    <div className='h-full w-full'>
      <div className='w-full '>
        <h3 className="text-md font-semibold text-gray-700 mb-4">Ratings and Reviews:</h3>
        {reviews.length > 0 ? (
          <div className="overflow-y-auto scrollNoDiv max-h-96">
            {reviews.map((reviewData) => (
              <div key={reviewData._id} className="mb-4 p-4 border border-gray-300 rounded-lg flex justify-between">
                <div className="w-4/5">
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
                <div className="w-1/5 flex flex-col items-end">
                  <img
                    src={reviewData.userId?.profilePicture}
                    alt={reviewData.userId?.userName}
                    className="w-8 h-8 rounded-full object-cover"
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

export default Reviews;
