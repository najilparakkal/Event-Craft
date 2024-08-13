import React from 'react';

interface CardProps {
    icon: JSX.Element;
    title: string;
    value: string | number;
    percentage: string;
    description: string;
    descriptionColor: string;
    gradientFrom: string;
    gradientTo: string;
    shadowColor: string;
}

interface CountsProps {
    bookingsCount: number;
    usersCount: number;
    vendorsCount: number;
    totalRevenue: number;
  }
const Card: React.FC<CardProps> = ({ icon, title, value, gradientFrom, gradientTo, shadowColor }) => (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-[#292F45] text-gray-400 w-full mt-6 shadow-md">
        <div className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr ${gradientFrom} ${gradientTo} text-white ${shadowColor} absolute -mt-4 grid h-16 w-16 place-items-center`}>
            {icon}
        </div>
        <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">{title}</p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{value}</h4>
        </div>
    
    </div>
);

const Counts: React.FC<CountsProps> = ({bookingsCount,usersCount,vendorsCount,totalRevenue}) => (
    <div className="flex space-x-4 m-3">
        <Card
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                </svg>
            }
            title="Totel Revenue"
            value={"₹"+totalRevenue}
            percentage="+55%"
            description="than last week"
            descriptionColor="text-green-500"
            gradientFrom="from-blue-600"
            gradientTo="to-blue-400"
            shadowColor="shadow-blue-500/40"
        />
        <Card
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd"></path>
                </svg>
            }
            title="Totel Users"
            value={usersCount}
            percentage="+3%"
            description="than last month"
            descriptionColor="text-green-500"
            gradientFrom="from-pink-600"
            gradientTo="to-pink-400"
            shadowColor="shadow-pink-500/40"
        />
        <Card
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                    <path d="M4 4H20V6H4V4ZM2 8H22V10H2V8ZM2 12H22V14H2V12ZM4 16H20V18H4V16ZM4 20H20V22H4V20Z" />
                    <path d="M16.73 2.58C16.55 2.22 16.21 2 15.83 2H8.17C7.79 2 7.45 2.22 7.27 2.58L1.92 14H22.08L16.73 2.58ZM9 4H15L19.14 12H4.86L9 4Z" />
                </svg>
            }
            title="Total Vendors"
            value={vendorsCount}
            percentage="-2%"
            description="than yesterday"
            descriptionColor="text-red-500"
            gradientFrom="from-green-600"
            gradientTo="to-green-400"
            shadowColor="shadow-green-500/40"
        />

        <Card
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                    <path d="M19 4h-1V2H6v2H5c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15H5V9h14v10zm-7-7c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zM6.54 19c.46-.81 1.17-1.47 2.03-1.88C9.59 17.05 10.75 17 12 17s2.41.05 3.43.12c.86.41 1.57 1.07 2.03 1.88H6.54z" />
                </svg>
            }
            title="Bookings"
            value={bookingsCount}
            percentage="+5%"
            description="than yesterday"
            descriptionColor="text-green-500"
            gradientFrom="from-orange-600"
            gradientTo="to-orange-400"
            shadowColor="shadow-orange-500/40"
        />

    </div>
);

export default Counts;
