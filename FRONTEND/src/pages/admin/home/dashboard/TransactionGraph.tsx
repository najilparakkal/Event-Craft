import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartData } from 'chart.js';

interface RevenueData {
    totalAmount: number;
    createdAt: string;
}

interface GraphProps {
    usersDetails: string[];
    vendorsDetails: string[];
    revenue: RevenueData[];
}

type TimePeriod = 'weekly' | 'monthly' | 'yearly';

const TransactionGraph: React.FC<GraphProps> = ({ usersDetails = [], vendorsDetails = [], revenue = [] }) => {
    const [timePeriod, setTimePeriod] = useState<TimePeriod>('yearly');

    const extractData = (dates: string[]): Record<TimePeriod, number[]> => {
        const dateCounts = {
            weekly: new Array(7).fill(0),
            monthly: new Array(30).fill(0),
            yearly: new Array(12).fill(0),
        };

        dates.forEach(dateStr => {
            const date = new Date(dateStr);
            const month = date.getMonth();
            const day = date.getDate();
            const weekDay = date.getDay();

            dateCounts.yearly[month]++;
            dateCounts.monthly[day - 1]++;
            dateCounts.weekly[weekDay]++;
        });

        return dateCounts;
    };

    const extractRevenueData = (revenue: RevenueData[]): Record<TimePeriod, number[]> => {
        const revenueCounts = {
            weekly: new Array(7).fill(0),
            monthly: new Array(30).fill(0),
            yearly: new Array(12).fill(0),
        };

        revenue.forEach(item => {
            const date = new Date(item.createdAt);
            const month = date.getMonth();
            const day = date.getDate();
            const weekDay = date.getDay();

            revenueCounts.yearly[month] += item.totalAmount;
            revenueCounts.monthly[day - 1] += item.totalAmount;
            revenueCounts.weekly[weekDay] += item.totalAmount;
        });

        return revenueCounts;
    };

    const userCounts = extractData(usersDetails);
    const vendorCounts = extractData(vendorsDetails);
    const revenueCounts = extractRevenueData(revenue);

    const labels: Record<TimePeriod, string[]> = {
        weekly: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        monthly: Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
        yearly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    };

    const data: ChartData<'line', number[], string> = {
        labels: labels[timePeriod],
        datasets: [
            {
                label: 'User Registrations',
                data: userCounts[timePeriod],
                fill: false,
                backgroundColor: 'blue',
                borderColor: 'blue',
            },
            {
                label: 'Vendor Registrations',
                data: vendorCounts[timePeriod],
                fill: false,
                backgroundColor: 'green',
                borderColor: 'green',
            },
            {
                label: 'Total Revenue',
                data: revenueCounts[timePeriod],
                fill: false,
                backgroundColor: 'red',
                borderColor: 'red',
            }
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const handleTimePeriodChange = (period: TimePeriod) => {
        setTimePeriod(period);
        document.getElementById("lastDaysdropdown")?.classList.toggle("hidden");
    };

    return (
        <div className="w-full rounded-lg shadow bg-[#292F45] p-4 md:p-6 m-3">
            <div className="flex justify-between mb-5">
                <div>
                    <button
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="lastDaysdropdown"
                        data-dropdown-placement="bottom"
                        type="button"
                        className="px-3 py-2 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={() => document.getElementById("lastDaysdropdown")?.classList.toggle("hidden")}
                    >
                        {timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)} Data
                        <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleTimePeriodChange('weekly')}>Last week</a></li>
                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleTimePeriodChange('monthly')}>Last month</a></li>
                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleTimePeriodChange('yearly')}>Last year</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="line-chart">
                <Line data={data} options={options} />
            </div>
            <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-2.5">
                <div className="pt-5">
                    <a href="#" className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-3.5 h-3.5 text-white me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2Zm-3 15H4.828a1 1 0 0 1 0-2h6.238a1 1 0 0 1 0 2Zm0-4H4.828a1 1 0 0 1 0-2h6.238a1 1 0 0 1 0 2Zm1-6H9V1.25a.25.25 0 0 1 .428-.172l3.56 3.56a.25.25 0 0 1-.178.428Z"/>
                        </svg>
                        Download report
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TransactionGraph;
