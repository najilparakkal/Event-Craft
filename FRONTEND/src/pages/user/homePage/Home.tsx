import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { fetchServices } from '../../../API/services/user/Services';
import Header from '../../../compounents/user/Header';
import Footer from '../../../compounents/user/Footer';
import VendorsCard from '../../../compounents/user/VendorsCard';
import Posts from './Posts';
import { useAppSelector } from '../../../costumeHooks/costum';

interface Service {
  _id: string;
  name: string;
  image: string;
  registered: string;
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
const Home: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const {_id} = useAppSelector((state)=>state.user.userDetails)
  useEffect(() => {
    const getServices = async () => {
      const servicesList= await fetchServices();
      setServices(servicesList.services);
      setVendors(servicesList.vendors);
    };
    getServices();
  }, []);

  const handleServiceClick = (serviceName: string) => {
    navigate(`/vendors/${serviceName}`);
  };

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

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main>
        <section className="relative">
          <img src="/user/pexels-emma-bauso-1183828-3585806.jpg" alt="Wedding" className="w-full h-screen object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end items-center text-white pb-8 sm:pb-12 px-4">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-center">India's Largest <span className="text-red-500">Wedding Services</span> Marketplace</h2>
            {/* <p className="text-base sm:text-lg mb-4 sm:mb-6">(For Delhi Services only)</p> */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4 sm:mb-8 w-full max-w-xl">
              <input type="text" placeholder="Search for vendors" className="px-4 py-2 rounded-md bg-gray-300 text-black placeholder-gray-700 w-full sm:flex-1" />
              <input type="text" placeholder="Search for location" className="px-4 py-2 rounded-md bg-gray-300 text-black placeholder-gray-700 w-full sm:flex-1" />
              <button className="bg-red-500 text-white px-6 py-2 rounded-md w-full sm:w-auto">Find Vendors</button>
            </div>
          </div>
        </section>

        <section className="container mx-auto py-10 px-8">
          <h3 className="text-2xl font-bold mb-8 text-center sm:text-left text-white">Services</h3>
          {Array.isArray(services) && services.length > 0 ? (
            <Slider {...settings}>
              {services.map((service) => (
                <div
                  key={service._id}
                  className="relative bg-gray-300 p-1 shadow-md text-center cursor-pointer"
                  onClick={() => handleServiceClick(service.name)}
                >
                  <img src={service.image} alt={service.name} className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h4 className="text-lg font-bold text-white">{service.name}</h4>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-white text-center">Loading...</p>
          )}
        </section>


        <VendorsCard vendors={vendors} />

          <Posts userId={_id+""}/>

        <div className="  text-center p-8">
          <h1 className="text-3xl font-bold mb-8 ">WHY CHOOSE US</h1>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full px-4 py-4 mb-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800  bg-opacity-50 transform transition-transform duration-700 hover:scale-105 ">
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





        
        <div className="relative max-w-screen-xl p-4 px-4 mx-auto   sm:px-6 lg:px-8 py-26 lg:mt-20">
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
                    <img className="w-32 rounded-lg shadow-lg md:w-56 transform transition-transform duration-700 hover:scale-105 " width="200" src="/outerPage/pexels-minan1398-1337303.jpg" alt="1" />
                    <img className="w-40 rounded-lg shadow-lg md:w-64 transform transition-transform duration-700 hover:scale-105 " width="260" src="/outerPage/pexels-burst-544961.jpg" alt="2" />
                  </div>
                  <div className="flex items-start justify-center ml-12 space-x-4 lg:justify-start">
                    <img className="w-24 rounded-lg shadow-lg md:w-40 transform transition-transform duration-700 hover:scale-105 " width="170" src="/outerPage/pexels-karl-rayson-10231869-19750199.jpg" alt="3" />
                    <img className="w-32 rounded-lg shadow-lg md:w-56 transform transition-transform duration-700 hover:scale-105 " width="200" src="/outerPage/pexels-emma-bauso-1183828-2253870.jpg" alt="4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="mt-10  p-8">
            <h2 className="text-2xl text-gray-500 mb-2">Didn't Get Your Vendor .?</h2>
            <p className="mb-6 text-gray-500">Our executives will call you to understand your requirements to find suitable vendors</p>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Enter Your Name"
                className="px-2 py-1 border-b-2 border-gray-300 bg-transparent text-black placeholder-gray-500 w-full"
              />
              <input
                type="text"
                placeholder="Enter Mobile Number"
                className="px-2 py-1 border-b-2 border-gray-300 bg-transparent text-black placeholder-gray-500 w-full"
              />

              <button className="bg-blue-600 text-white px-6 py-2 rounded-md">Submit</button>
            </div>
          </div>
      </main>
      <Footer/>
    </div>
  );
};

export default React.memo(Home);
