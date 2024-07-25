import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ApexChartProps {}

const ApexChart: React.FC<ApexChartProps> = () => {
    const series = [
        {
            name: 'Completed Bookings',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 100, 110, 120], // Added values for Oct, Nov, Dec
        },
        {
            name: 'Pending Bookings',
            data: [20, 30, 25, 40, 45, 50, 60, 70, 85, 75, 80, 90], // Added values for Oct, Nov, Dec
        },
        {
            name: 'Cancelled Bookings',
            data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65], // Added values for Oct, Nov, Dec
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
            <div id="html-dist"></div>
        </div>
    );
};

export default ApexChart;
