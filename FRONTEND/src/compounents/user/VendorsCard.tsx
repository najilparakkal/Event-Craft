import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import { addVendorLike } from '../../API/services/user/Services';
import { useAppSelector } from '../../costumeHooks/costum';

interface Post {
  images: string;
  title?: string;
}

interface Licence {
  description: string;
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
      if (vendor.likes?.includes(_id+"")) {
        acc.push(vendor._id);
      }
      return acc;
    }, [] as string[]);
    setVendorLike(likedVendors);
  }, [vendors, _id]);

  const filteredVendors = vendors.filter((vendor) =>
    vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const handleShowLess = () => {
    setVisibleCount(6);
  };

  const handleFavoriteClick = async (vendorId: string) => {
    await addVendorLike(_id+"", vendorId);
    setVendorLike((prevLikedVendors) =>
      prevLikedVendors.includes(vendorId)
        ? prevLikedVendors.filter((id) => id !== vendorId)
        : [...prevLikedVendors, vendorId]
    );
  };

  return (
    <div className="w-full p-12 bg-transparent">
      <div className="flex items-end justify-between mb-12 header">
        <div className="title">
          <p className="mb-4 text-4xl font-bold text-gray-800">Vendors</p>
        </div>
        <div className="text-end">
          <form
            className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative">
              <input
                type="text"
                id="form-subscribe-Search"
                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                placeholder="Enter a vendor name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-gray-800 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
        {filteredVendors.slice(0, visibleCount).map((vendor) => (
          <div
            key={vendor._id}
            className="m-auto overflow-hidden rounded-lg shadow-lg cursor-pointer h-90 w-60 md:w-80"
          >
            <a className="block w-full h-full" onClick={() => navigate(`/vendorProfile/${vendor._id}`)}>
              {vendor.posts.length > 0 ? (
                <Slider {...postSettings} className="!p-0 !m-0">
                  {vendor.posts.map((post, index) => (
                    <div key={index} className="max-h-40 !p-0 !m-0">
                      <img
                        src={post.images}
                        alt={`Post ${index}`}
                        className="object-cover w-full h-full block"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="max-h-40 !p-0 !m-0">
                  <img
                    alt="vendor cover"
                    src={vendor.coverPicture}
                    className="object-cover w-full h-40 block"
                  />
                </div>
              )}
              <div className="w-full p-4 bg-white dark:bg-gray-800 h-30">
                <div className="flex items-center mt-4">
                  <a href="#" className="relative block">
                    <img
                      alt="profile"
                      src={vendor.profilePicture}
                      className="mx-auto object-cover rounded-full h-10 w-10 block"
                    />
                  </a>
                  <div className="flex flex-col justify-between ml-4 text-sm">
                    <p className="text-gray-800 dark:text-white">{vendor.vendorName}</p>
                    <a className="text-white px-2 rounded-md flex items-center" onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteClick(vendor._id);
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill={vendorLike.includes(vendor._id) ? "red" : "currentColor"} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        {visibleCount < filteredVendors.length ? (
          <button
            className="px-4 py-2 text-base font-semibold text-white bg-gray-800 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
            onClick={handleShowMore}
          >
            More
          </button>
        ) : (
          <button
            className="px-4 py-2 text-base font-semibold text-white bg-gray-800 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
            onClick={handleShowLess}
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(VendorsCard);
