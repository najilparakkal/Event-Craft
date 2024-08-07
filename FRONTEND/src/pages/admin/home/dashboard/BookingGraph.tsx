import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { fetchBookingsCount } from '../../../../API/services/admin/Dashboard';


interface BookingData {
    cancelled: { count: number; createdAt: string }[];
    completed: { count: number; createdAt: string }[];
    pending: { count: number; createdAt: string }[];
}

const ApexChart: React.FC = () => {
    const [pendingCounts, setPendingCounts] = useState<number[]>(Array(12).fill(0));
    const [completedCounts, setCompletedCounts] = useState<number[]>(Array(12).fill(0));
    const [cancelledCounts, setCancelledCounts] = useState<number[]>(Array(12).fill(0));

    useEffect(() => {
        fetchBookingsCount()
            .then((data: BookingData) => {
                setPendingCounts(data.pending);
                setCompletedCounts(data.completed);
                setCancelledCounts(data.cancelled);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }, []);

    const series = [
        {
            name: 'Completed ',
            data: completedCounts,
        },
        {
            name: 'Pending ',
            data: pendingCounts,
        },
        {
            name: 'Cancelled ',
            data: cancelledCounts,
        },
    ];

    const options = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yaxis: {
            title: {
                text: 'Bookings',
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: (val: number) => `${val} bookings`,
            },
        },
    };

    return (
        <div className='h-full'>
            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="bar"
                    height={420}
                />
            </div>
        </div>
    );
};

export default ApexChart;
