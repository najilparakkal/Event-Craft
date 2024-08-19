import React, { useEffect, useState } from 'react';
import Navbar from '../../../../compounents/vendor/Navbar';
import { fetchCoutsVendorSide } from '../../../../API/services/vendor/services';


const About: React.FC = () => {
    const [userCount, setUserCount] = useState(0)
    const [VendorsCount, setVendorsCount] = useState(0)
    const [eventsCount, setEventsCount] = useState(0)
    useEffect(() => {
        fetchCoutsVendorSide()
            .then((data) => {
                setUserCount(data.userCount);
                setVendorsCount(data.vendorCount);
                setEventsCount(data.eventsCount);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="w-full min-h-screen   ">
            <Navbar />
            <section className="h-full">
                <div className="container grid gap-8 items-center py-4 px-4 mx-auto lg:grid-cols-2 lg:py-8">
                    <div className="font-light text-gray-700 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-2xl md:text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-700">
                            Our Mission
                        </h2>
                        <p className="mb-4 text-sm md:text-base">
                            Our mission is to make your vision come to life. We understand that no two events are the same, which is why we work closely with you to craft a personalized experience that reflects your unique style and goals. From concept to execution, we handle everything with professionalism and care, ensuring a seamless and stress-free process.
                        </p>
                        <h2 className="mb-4 text-2xl md:text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-700">
                            Why Choose Us
                        </h2>
                        <p className="mb-4 text-sm md:text-base">
                            Choose us for personalized, stress-free event management. Our expert team, attention to detail, strong vendor relationships, and innovative ideas ensure unforgettable experiences.
                        </p>

                        <div className="max-w-screen-xl px-4 py-2 mx-auto text-center lg:py-1 lg:px-5">
                            <dl className="grid max-w-screen-md gap-4 mx-auto text-gray-900 sm:grid-cols-3 dark:text-gray-700">
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-1 text-2xl md:text-3xl font-extrabold">{userCount}</dt>
                                    <dd className="font-light text-gray-800 dark:text-gray-400 text-xs md:text-sm">USERS</dd>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-1 text-2xl md:text-3xl font-extrabold">{VendorsCount}</dt>
                                    <dd className="font-light text-gray-800 dark:text-gray-400 text-xs md:text-sm">VENDORS</dd>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-1 text-2xl md:text-3xl font-extrabold">{eventsCount}</dt>
                                    <dd className="font-light text-gray-800 dark:text-gray-400 text-xs md:text-sm">EVENTS COMPLETED</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-8">
                        <div className="relative">
                            <img className="w-full rounded-lg object-cover" src="/outerPage/pexels-pavel-danilyuk-7119380.jpg" alt="Founder John" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white font-bold">
                                    <span className="text-gray-600">FOUNDER:</span> John
                                </span>
                            </div>
                        </div>
                        <div className="relative mt-4 lg:mt-10">
                            <img className="w-full rounded-lg object-cover" src="/outerPage/pexels-moh-adbelghaffar-764529.jpg" alt="CEO Dhilsha" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white font-bold">
                                    <span className="text-gray-600">CEO:</span> Dhilsha
                                </span>
                            </div>
                        </div>
                        <div className="relative mt-[80px] lg:mt-15">
                            <img className="w-full rounded-lg object-cover" src="/outerPage/pexels-lucxama-sylvain-1361467-2766298.jpg" alt="COO Prejeesh" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white font-bold">
                                    <span className="text-gray-600">COO:</span> Prejeesh
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 flex border-t border-gray-200 max-w-xs mx-auto items-center justify-between">
                    <a href="#" aria-label="Follow us on Facebook">
                        <svg
                            width="20"
                            height="20"
                            fill="#000000"
                            className="text-xl transition-colors duration-200 hover:fill-[#808080]"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"></path>
                        </svg>
                    </a>
                    <a href="#" aria-label="Follow us on Twitter">
                        <svg
                            width="20"
                            height="20"
                            fill="#000000"
                            className="text-xl transition-colors duration-200 hover:fill-[#808080]"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"></path>
                        </svg>
                    </a>
                    <a href="#" aria-label="Connect with us on LinkedIn">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="#000000"
                            className="text-xl transition-colors duration-200 hover:fill-[#808080]"
                            viewBox="0 0 1792 1792"
                        >
                            <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53.5-105.5 20-150q0-129-90-223 41-101-9-229-31-10-87.5 11t-88.5 28l-38 17q-73-20-146-20t-146 20q-16-7-42.5-19t-83-29-86.5-11q-51 128-10 229-90 94-90 223 0 85 20 150t53.5 105.5 81 66.5 94 39 102.5 18q-39 35-47 99-22 10-61 15t-69 5.5-71-1.5-67-12.5-56-29.5q-13-23-33-50.5t-39.5-45-35.5-31.5-51-27-47-13q-140 0-140 169 0 149 79.5 268t210.5 194 281 67q271 0 470.5-173.5t252.5-444.5q40-149 40-306 0-209-103-385.5t-279.5-279.5-385.5-103-385.5 103-279.5 279.5-103 385.5q0 157 40 306 45 171 144 313.5t250 218.5q-71 27-158 30-5 1-13 1-53 0-101-18-228-71-377.5-277.5t-149.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103z"></path>
                        </svg>
                    </a>
                    <a href="#" aria-label="Follow us on Instagram">
                        <svg
                            width="20"
                            height="20"
                            fill="#000000"
                            className="text-xl transition-colors duration-200 hover:fill-[#808080]"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm160-468v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5zm160 0v832q0 198-139 337t-337 139h-832q-198 0-337-139t-139-337v-832q0-198 139-337t337-139h832q198 0 337 139t139 337z"></path>
                        </svg>
                    </a>
                </div>

            </section>
        </div>

    );
};

export default About;
