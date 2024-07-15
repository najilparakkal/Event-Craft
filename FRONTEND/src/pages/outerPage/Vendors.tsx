import React, { useEffect, useState } from 'react';
import { fetchOuterServices } from '../../API/services/user/Services';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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
  phoneNum: string;
  posts: Post[];
  registered: string;
  verified: boolean;
  licence: Licence[];
}

const Vendors: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchOuterServices();
        setVendors(data.vendors);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };
    fetch();
  }, []);

  const postSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const licenceSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full p-12 bg-white">
      <div className="flex items-end justify-between mb-12 header">
        <div className="title">
          <p className="mb-4 text-4xl font-bold text-gray-800">Latest Vendors</p>
          <p className="text-2xl font-light text-gray-400">
            All vendors are verified and listed here
          </p>
        </div>
        <div className="text-end">
          <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
            <div className="relative">
              <input
                type="text"
                id="form-subscribe-Search"
                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter a vendor name"
              />
            </div>
            <button
              className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
        {vendors.map((vendor) => (
          <div
            key={vendor._id}
            className="m-auto overflow-hidden rounded-lg shadow-lg cursor-pointer h-90 w-60 md:w-80"
          >
            <a href="#" className="block w-full h-full">
              {vendor.posts.length > 0 ? (
                <Slider {...postSettings}>
                  {vendor.posts.map((post, index) => (
                    <div key={index} className="max-h-40">
                      <img
                        src={post.images}
                        alt={`Post ${index}`}
                        className="object-cover w-full h-40"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <img
                  alt="vendor cover"
                  src={vendor.coverPicture}
                  className="object-cover w-full h-40"
                />
              )}
              <div className="w-full p-4 bg-white dark:bg-gray-800 h-32">
                <div className="flex items-center mt-4">
                  <a href="#" className="relative block">
                    <img
                      alt="profile"
                      src={vendor.profilePicture}
                      className="mx-auto object-cover rounded-full h-10 w-10"
                    />
                  </a>
                  <div className="flex flex-col justify-between ml-4 text-sm">
                    <p className="text-gray-800 dark:text-white">{vendor.vendorName}</p>
                    {vendor.licence.length > 0 ? (
                      <Slider {...licenceSettings}>
                        {vendor.licence.map((item, index) => (
                          <div key={index} className="h-10 flex items-center">
                            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                          </div>
                        ))}
                      </Slider>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300">No license descriptions available</p>
                    )}
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vendors;
