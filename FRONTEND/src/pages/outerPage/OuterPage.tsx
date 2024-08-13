import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { fetchOuterServices } from '../../API/services/user/Services';
import Footer from '../../compounents/user/Footer';
import VendorsCard from '../../compounents/user/VendorsCard';
import { useLogout } from '../../API/services/user/userAuthService';
import { vendorLogout } from '../../API/services/vendor/vendorAuthService';
import Helper from '../../compounents/user/Helper';
import { Toaster } from 'react-hot-toast';

interface Category {
  id: number;
  name: string;
  image: string;
}

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


interface ILicence {
  accountNumber: string;
  applicantName: string;
  businessName: string;
  certificateExpirationDate: string;
  description: string;
  emailAddress: string;
  licence: string[];
  location: string;
  phoneNumber: string;
  profilePicture: string;
  requestedDate: string;
  services: string;
  upiIdOrPhoneNumber: string;
  vendorId: string;
  verified: boolean;
  _id: string;
}

interface IVendor {
  availableDate: string[];
  blocked: boolean;
  chats: any[];
  coverPicture: string;
  email: string;
  licence: ILicence[];
  likes: string[];
  otp: string;
  password: string;
  phoneNum: string;
  posts: any[];
  profilePicture: string;
  ratingAndReview: any[];
  refreshToken: string;
  registered: string;
  updatedAt: string;
  vendor: boolean;
  vendorName: string;
  verified: boolean;
  wallet: number;
  _id: string;
}
interface Licence {
  description: string;
  location: string;
}

const OuterPage: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<IVendor[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const handleLogout = useLogout();
  const handleVendorLogout = vendorLogout()

  useEffect(() => {
    handleLogout();
    handleVendorLogout()
    const fetch = async () => {
      const datas = await fetchOuterServices();
      setCategories(datas.services);
      setVendors(datas.vendors);
    };
    fetch();
  }, []);



  useEffect(() => {
    const filterVendors = () => {
      const filtered: any = vendors.filter((vendor) => {

        const matchesName = vendor.vendorName.toLowerCase().includes(searchName.toLowerCase());
        const matchesLocation = vendor.licence.some(
          (licence) => licence.location.toLowerCase().includes(searchLocation.toLowerCase())
        );
        return matchesName && matchesLocation;
      });
      setFilteredVendors(filtered);
    };
    filterVendors();
  }, [vendors, searchName, searchLocation]);


  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
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
          dots: false,
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

  return (
    <div className="relative scrollNoDiv overflow-y-auto shadow-md  scrollbar-hidden bg-black ">
      <Toaster position='top-center' />
      <header className="bg-transparent absolute top-0 left-0 w-full z-10">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <img
            src="/logo-no-background.png"
            className="h-8 sm:h-8 cursor-pointer"
            alt="Event Planner Logo"
            onClick={() => navigate("/about")}
          />

          <nav className="flex space-x-4">
            <a
              onClick={() => navigate("/vendor/login")}
              className="text-gray-300 hover:text-white cursor-pointer"
            >
              Become a Vendor?
            </a>
            <a
              onClick={() => navigate("/login")}
              className="text-gray-300 hover:text-white cursor-pointer"
            >
              Login
            </a>
          </nav>
        </div>
      </header>

      <div className='w-full'>
        <section className="relative w-full">
          <img src="/outerPage/pexels-leah-newhouse-50725-540522.jpg" alt="Wedding" className="w-full h-screen sm:h-screen object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end items-center text-white pb-8 sm:pb-12 px-4">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-center">India's Largest <span className="text-red-500">Event Services</span> Marketplace</h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4 sm:mb-8 w-full max-w-xl">
              <input
                type="text"
                placeholder="Search for vendors"
                className="px-4 py-2 rounded-md bg-gray-300 text-black placeholder-gray-700 w-full sm:flex-1"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Search for location"
                className="px-4 py-2 rounded-md bg-gray-300 text-black placeholder-gray-700 w-full sm:flex-1"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
              <button
                className="transition duration-150 ease-out hover:ease-out bg-red-500 text-white px-6 py-2 rounded-md w-full sm:w-auto"
                onClick={() => { }}
              >
                Find Vendors
              </button>
            </div>
          </div>
        </section>





        <VendorsCard vendors={filteredVendors} />




        {Array.isArray(categories) && categories.length > 0 ? (
          <Slider {...settings}>
            {categories.map((item) => (
              <div key={item.id} className="relative bg-white p-1 transform transition-transform duration-700 hover:scale-105 hover:shadow-xl mt-10 border-none shadow-md text-center ">
                <img src={item.image} alt={item.name} className="w-full h-32 object-cover " />
                <div className="absolute inset-0  bg-black  bg-opacity-50 flex items-center justify-center">
                  <h4 className="text-lg font-bold text-white transform transition-transform duration-700 hover:scale-105 hover:shadow-xl">{item.name}</h4>
                </div>
              </div>
            ))}
          </Slider>
        ) : (

          <div className="flex flex-col  gap-5 p-2 mx-auto w-screen bg-white shadow-lg select-none sm:p-4 sm:h-64 rounded-2xl sm:flex-row ">
            <div className="bg-gray-200 h-52 sm:h-full sm:w-72 rounded-xl animate-pulse">
            </div>
            <div className="flex flex-col flex-1 gap-5 sm:p-2">
              <div className="flex flex-col flex-1 gap-3">
                <div className="w-full bg-gray-200 animate-pulse h-14 rounded-2xl">
                </div>
                <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl">
                </div>
                <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl">
                </div>
                <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl">
                </div>
                <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl">
                </div>
              </div>
              <div className="flex gap-3 mt-auto">
                <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse">
                </div>
                <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse">
                </div>
                <div className="w-20 h-8 ml-auto bg-gray-200 rounded-full animate-pulse">
                </div>
              </div>
            </div>
          </div>
        )}
        <section className='relative'>

          <Helper _id={null} />

        </section>



        <div className="  text-center p-8">
          <h1 className="text-3xl font-bold mb-8 ">WHY CHOOSE US</h1>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full px-4 py-4 mb-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800 transform transition-transform duration-700 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center justify-center transition-transform duration-700 hover:scale-105 hover:shadow-2xl w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
                <svg width="20" height="20" fill="currentColor" className="w-6 transition-transform duration-700 hover:scale-105 hover:shadow-2xl h-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
                </svg>
              </div>
              <h3 className="py-4 text-2xl font-semibold transition-transform duration-700 hover:scale-105 hover:shadow-2xl text-gray-700 sm:text-xl dark:text-white">
                100% Trusted
              </h3>
              <p className="py-4 text-gray-500 text-md transition-transform duration-700 hover:scale-105 hover:shadow-2xl dark:text-gray-300">
                We are trusted by numerous clients for our reliable and professional event management services.
              </p>
            </div>
            <div className="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800 transform transition-transform duration-700 hover:scale-105 ">
              <div className="flex items-center transition-transform duration-700 hover:scale-105 hover:shadow-2xl justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
                <svg width="20" height="20" fill="currentColor" className="w-6 transition-transform duration-700 hover:scale-105 hover:shadow-2xl h-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
                </svg>
              </div>
              <h3 className="py-4 transition-transform duration-700 hover:scale-105 hover:shadow-2xl text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
                24/7 Support
              </h3>
              <p className="py-4 transition-transform duration-700 hover:scale-105 hover:shadow-2xl text-gray-500 text-md dark:text-gray-300">
                Our team is available around the clock to assist you with any queries or issues you may have.
              </p>
            </div>
            <div className="w-full px-4 py-4 mb-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800 transform transition-transform duration-700 hover:scale-105 ">
              <div className="flex transform transition-transform duration-300 hover:scale-105 hover:shadow-xl items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
                <svg width="20" height="20" fill="currentColor" className="w-6 h-6 transition-transform duration-700 hover:scale-105 hover:shadow-2xl" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
                </svg>
              </div>
              <h3 className="py-4 transition-transform duration-700 hover:scale-105 hover:shadow-2xl text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
                Experienced Team
              </h3>
              <p className="py-4 transition-transform duration-700 hover:scale-105 hover:shadow-2xl text-gray-500 text-md dark:text-gray-300">
                Our team has extensive experience in managing events of all scales and ensuring they are a success.
              </p>
            </div>
          </div>
        </div>






        <div className="relative max-w-screen-xl p-4 px-4 mx-auto bg-black  sm:px-6 lg:px-8 py-26 lg:mt-20">
          <div className="relative">
            <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="ml-auto lg:col-start-2 lg:max-w-2xl">
                <p className="text-base font-semibold leading-6 dark:text-gray-600  uppercase">
                  Why Choose Us
                </p>
                <h4 className="mt-2 text-2xl font-extrabold leading-8 text-gray-900 dark:text-gray-600 sm:text-3xl sm:leading-9">
                  Trusted marketplace
                </h4>
                <p className="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-300">
                  Choose us for personalized, stress-free event management. Expert team, attention to detail, strong vendor relationships, and innovative ideas ensure unforgettable experiences.                  </p>
                <ul className="gap-6 mt-8 md:grid md:grid-cols-2">
                  <li className="mt-6 lg:mt-0">
                    <div className="flex">
                      <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-800 bg-green-100 rounded-full dark:text-green-500 drark:bg-transparent">
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd">
                          </path>
                        </svg>
                      </span>
                      <span className="ml-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-200">
                        Expert Team
                      </span>
                    </div>
                  </li>
                  <li className="mt-6 lg:mt-0">
                    <div className="flex">
                      <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-800 bg-green-100 rounded-full dark:text-green-500 drark:bg-transparent">
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd">
                          </path>
                        </svg>
                      </span>
                      <span className="ml-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-200">
                        Personalized Service
                      </span>
                    </div>
                  </li>
                  <li className="mt-6 lg:mt-0">
                    <div className="flex">
                      <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-800 bg-green-100 rounded-full dark:text-green-500 drark:bg-transparent">
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd">
                          </path>
                        </svg>
                      </span>
                      <span className="ml-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-200">
                        24/7 Support
                      </span>
                    </div>
                  </li>
                  <li className="mt-6 lg:mt-0">
                    <div className="flex">
                      <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-800 bg-green-100 rounded-full dark:text-green-500 drark:bg-transparent">
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd">
                          </path>
                        </svg>
                      </span>
                      <span className="ml-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-200">
                        Client Satisfaction
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative mt-10 lg:-mx-4 relative-20 lg:mt-0 lg:col-start-1">
                <div className="relative space-y-4">
                  <div className="flex items-end justify-center space-x-4 lg:justify-start">
                    <img className="w-32 rounded-lg shadow-lg md:w-56" width="200" src="/outerPage/pexels-minan1398-1337303.jpg" alt="1" />
                    <img className="w-40 rounded-lg shadow-lg md:w-64" width="260" src="/outerPage/pexels-burst-544961.jpg" alt="2" />
                  </div>
                  <div className="flex items-start justify-center ml-12 space-x-4 lg:justify-start">
                    <img className="w-24 rounded-lg shadow-lg md:w-40" width="170" src="/outerPage/pexels-karl-rayson-10231869-19750199.jpg" alt="3" />
                    <img className="w-32 rounded-lg shadow-lg md:w-56" width="200" src="/outerPage/pexels-emma-bauso-1183828-2253870.jpg" alt="4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default React.memo(OuterPage);
