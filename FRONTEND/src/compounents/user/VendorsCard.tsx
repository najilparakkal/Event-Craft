import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import { addVendorLike } from '../../API/services/user/Services';
import { useAppSelector } from '../../costumeHooks/costum';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Post {
  images: string;
  title?: string;
}

interface Licence {
  description: string;
  services: string;
}

interface Vendor {
  _id: string;
  vendorName: string;
  profilePicture: string;
  coverPicture: string;
  email: string;
  phoneNum?: string;
  posts: Post[];
  registered: string;
  verified?: boolean;
  licence?: Licence[];
  likes?: string[];
  ratingAndReviewCount?: number;
  likesCount?: number;
  views?: number;
  postedTime?: string;
}

interface VendorsProps {
  vendors: Vendor[];
}

const VendorsCard: React.FC<VendorsProps> = ({ vendors }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const navigate = useNavigate();
  const [vendorLike, setVendorLike] = useState<string[]>([]);
  const { _id } = useAppSelector((state) => state.user.userDetails);
  const postSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  useEffect(() => {
    const likedVendors = vendors.reduce((acc, vendor) => {
      if (vendor.likes?.includes(_id + "")) {
        acc.push(vendor._id);
      }
      return acc;
    }, [] as string[]);
    setVendorLike(likedVendors);
  }, [vendors, _id]);

  

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const handleShowLess = () => {
    setVisibleCount(6);
  };

  const handleFavoriteClick = async (vendorId: string) => {
    await addVendorLike(_id + "", vendorId);
    setVendorLike((prevLikedVendors) =>
      prevLikedVendors.includes(vendorId)
        ? prevLikedVendors.filter((id) => id !== vendorId)
        : [...prevLikedVendors, vendorId]
    );
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.licence?.some((license) =>
      license.services.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="w-full p-12 bg-transparent">
      <div className="flex items-end justify-between mb-12">
        <p className="mb-4 text-4xl font-bold text-gray-800">Vendors</p>
        <input
          type="text"
          placeholder="Search Services or Vendors.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/4 p-2 mt-[40px]  rounded  border-b-2 border-gray-300 bg-transparent text-white placeholder-gray-500 "
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredVendors.slice(0, visibleCount).map((vendor) => (
          <div key={vendor._id} className="flex bg-gray-800  transition-all duration-700 hover:scale-105 hover:shadow-2xl p-4 rounded-lg shadow-md">
            <div className="w-3/6 relative">
              {vendor.posts.length > 0 ? (
                <Slider {...postSettings} className="rounded-lg">
                  {vendor.posts.map((post, index) => (
                    <div key={index}>
                      <img
                        src={post.images}
                        alt={`Post ${index}`}
                        className="w-full h-24 object-cover rounded-lg  transition-transform duration-700 hover:scale-90 hover:shadow-2xl"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <img
                  src={vendor.coverPicture}
                  alt="Vendor cover"
                  className="w-full h-24 object-cover rounded-lg"
                />
              )}
              <div className="absolute bottom-2 left-2 flex items-center">
                <img
                  src={vendor.profilePicture}
                  alt={vendor.vendorName}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between w-3/5 ml-4">
              <div className='w-full'>
                <h3 className="text-lg font-semibold text-white">{vendor.vendorName}</h3>
                <div className="flex items-center justify-between mt-2 text-gray-500 text-xs">
                  <div className="flex items-center mr-4">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="mr-1"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1664 960q-152-236-381-353 61 104 61 225 0 185-131.5 316.5t-316.5 131.5-316.5-131.5-131.5-316.5q0-121 61-225-229 117-381 353 133 205 333.5 326.5t434.5 121.5 434.5-121.5 333.5-326.5zm-720-384q0-20-14-34t-34-14q-125 0-214.5 89.5t-89.5 214.5q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm848 384q0 34-20 69-140 230-376.5 368.5t-499.5 138.5-499.5-139-376.5-368q-20-35-20-69t20-69q140-229 376.5-368t499.5-139 499.5 139 376.5 368q20 35 20 69z"></path>
                    </svg>
                    {vendor.ratingAndReviewCount} Reviews
                  </div>
                  <div className="flex items-center">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="mr-1"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1664 596q0-81-21.5-143t-55-98.5-81.5-59.5-94-31-98-8-112 25.5-110.5 64-86.5 72-60 61.5q-18 22-49 22t-49-22q-24-28-60-61.5t-86.5-72-110.5-64-112-25.5-98 8-94 31-81.5 59.5-55 98.5-21.5 143q0 168 187 355l581 560 580-559q188-188 188-356zm128 0q0 221-229 450l-623 600q-18 18-44 18t-44-18l-624-602q-10-8-27.5-26t-55.5-65.5-68-97.5-53.5-121-23.5-138q0-220 127-344t351-124q62 0 126.5 21.5t120 58 95.5 68.5 76 68q36-36 76-68t95.5-68.5 120-58 126.5-21.5q224 0 351 124t127 344z"></path>
                    </svg>
                    {vendor.likesCount} Likes
                  </div>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <IconButton onClick={() => handleFavoriteClick(vendor._id)}>
                  <FavoriteIcon
                    fontSize="small"
                    color={vendorLike.includes(vendor._id) ? "error" : "inherit"}
                    viewBox="0 0 24 24"
                  />
                </IconButton>

                <button
                  onClick={() => navigate(`/vendorProfile/${vendor._id}`)}
                  className=" hover:cursor-pointer hover:text-white p-1 text-blue-800 font-bold rounded"
                >
                  Get Closer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        {visibleCount < filteredVendors.length && (
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={handleShowMore}
          >
            Show More
          </button>
        )}
        {visibleCount > 6 && (
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={handleShowLess}
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default VendorsCard;
