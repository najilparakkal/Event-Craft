import React, { useEffect, useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isBefore } from 'date-fns';
import { fetchDates, updateVendorDate } from '../../../../API/services/vendor/services';
import toast, { Toaster } from 'react-hot-toast';

interface Prop {
    vendorId: string;
}

const DatePicker: React.FC<Prop> = ({ vendorId }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [absentDates, setAbsentDates] = useState<Date[]>([]);

    useEffect(() => {
        fetchDates(vendorId).then((data) => {
            setAbsentDates(data.map((dateString: string) => new Date(dateString)));
        }).catch((err) => {
            console.log(err);
        });
    }, [vendorId]);

    const handleDateClick = (date: Date) => {
        if (isBefore(date, new Date())) return;
        if (absentDates.some(absentDate => isSameDay(absentDate, date))) {
            setAbsentDates(absentDates.filter(absentDate => !isSameDay(absentDate, date)));
        } else {
            setAbsentDates([...absentDates, date]);
        }
    };

    const handleUpdate = async () => {
        const formattedDates = absentDates.map(date => format(date, 'yyyy-MM-dd'));
        console.log(formattedDates);
        try {
            await updateVendorDate(formattedDates, vendorId);
            toast.success('Dates updated successfully!');
        } catch (error) {
            toast.error('Failed to update dates.');
        }
    };

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between mb-4">
                <div className="text-xl font-bold text-left text-black">
                    {format(currentMonth, 'MMM yyyy')}
                </div>
                <div className="flex space-x-4">
                    <button
                        className="p-2 text-white bg-blue-500 rounded-full"
                        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    >
                        <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"
                            />
                        </svg>
                    </button>
                    <button
                        className="p-2 text-white bg-blue-500 rounded-full"
                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    >
                        <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"
                            />
                        </svg>
                    </button>
                    <button
                        className="p-2 text-white bg-green-500 rounded-full"
                        onClick={handleUpdate}
                    >
                        Update
                    </button>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const days = [];
        const dateFormat = 'EEEEEE';
        let startDate = startOfWeek(currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <th key={i} className="px-2 py-3 md:px-3 text-black">
                    {format(addDays(startDate, i), dateFormat)}
                </th>
            );
        }

        return <tr>{days}</tr>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = 'd';
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = '';

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                const isAbsent = absentDates.some(absentDate => isSameDay(absentDate, day));
                const isPast = isBefore(cloneDay, new Date());

                days.push(
                    <td
                        key={day.toString()}
                        className={`px-2 py-3 text-center cursor-pointer md:px-3 ${!isSameMonth(day, monthStart)
                            ? 'text-gray-300'
                            : isSameDay(day, new Date())
                                ? 'text-blue-500'
                                : isAbsent
                                    ? 'text-red-500'
                                    : isPast
                                        ? 'text-gray-400'
                                        : 'hover:text-blue-500 text-black'
                            }`}
                        onClick={() => handleDateClick(cloneDay)}
                    >
                        <span>{formattedDate}</span>
                    </td>
                );
                day = addDays(day, 1);
            }
            rows.push(<tr key={day.toString()}>{days}</tr>);
            days = [];
        }

        return <tbody>{rows}</tbody>;
    };

    return (
        <div className="p-4 bg-transparent shadow-lg rounded-2xl">
            <Toaster />
            <div className="flex flex-wrap overflow-hidden">
                <div className="w-full rounded shadow-sm">
                    {renderHeader()}
                    <div className="-mx-2">
                        <table className="w-full">
                            <thead>{renderDays()}</thead>
                            {renderCells()}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(DatePicker);
