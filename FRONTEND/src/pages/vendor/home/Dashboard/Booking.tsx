import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../costumeHooks/costum';
import { userBookings, cancelBooking, acceptBooking, updateBooking } from '../../../../API/services/vendor/services';
import { useNavigate } from 'react-router-dom';
import Billing from './Billing';
import toast, { Toaster } from 'react-hot-toast';

interface Booking {
    _id: string;
    clientName: string;
    eventDate: string;
    event: string;
    advance: number;
    arrivalTime: string;
    email: string;
    endingTime: string;
    guests: number;
    location: string;
    phoneNumber: string;
    pincode: string;
    userId: string;
    vendorId: string;
    vendorName: string;
    accepted: boolean;
    status: string;
}

const Booking: React.FC = () => {
    const { _id } = useAppSelector((state) => state.vendor.vendorDetails);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [acceptedBookings, setAcceptedBookings] = useState<Booking[]>([]);
    const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
    const [showAcceptModal, setShowAcceptModal] = useState<boolean>(false);
    const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [showSubmitBillModal, setShowSubmitBillModal] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});
    const [selectedBillBooking, setSelectedBillBooking] = useState<Booking | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            const datas: Booking[] = await userBookings(_id + "");
            const accepted: Booking[] = [];
            const pending: Booking[] = [];
            datas.forEach(item => {
                if (item.accepted) {
                    accepted.push(item);
                } else {
                    pending.push(item);
                }
            });
            setAcceptedBookings(accepted);
            setBookings(pending);
        };
        fetchBookings();
    }, [_id]);

    const calculateDaysDifference = (eventDate: string) => {
        const currentDate = new Date();
        const eventDateObj = new Date(eventDate);
        const timeDiff = eventDateObj.getTime() - currentDate.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };

    const handleCancelClick = (booking: Booking) => {
        const daysDifference = calculateDaysDifference(booking.eventDate);
        const refund = daysDifference >= 3 ? 50 : 25;
        console.log(`Refund amount: ${refund}`);
        setSelectedBooking(booking);
        setShowCancelModal(true);
    };

    const handleAcceptClick = (booking: Booking) => {
        setSelectedBooking(booking);
        setShowAcceptModal(true);
    };

    const handleDetailsClick = (booking: Booking) => {
        setSelectedBooking(booking);
        setShowDetailsModal(true);
    };

    const handleCloseModal = () => {
        setShowCancelModal(false);
        setShowAcceptModal(false);
        setShowDetailsModal(false);
        setSelectedBooking(null);
    };

    const handleConfirmCancel = async () => {
        if (selectedBooking) {
            await cancelBooking(selectedBooking._id);
            setBookings(prev => prev.filter(booking => booking._id !== selectedBooking._id));
            handleCloseModal();
        }
    };

    const handleConfirmAccept = async () => {
        if (selectedBooking) {
            const acceptedBooking = await acceptBooking(selectedBooking._id);
            setAcceptedBookings(prev => [...prev, acceptedBooking]);
            setBookings(prev => prev.filter(booking => booking._id !== selectedBooking._id));
            handleCloseModal();
        }
    };

    const toggleMenu = (id: string, bookedDate: string) => {
        const currentDate = new Date();
        const eventDate = new Date(bookedDate);
    
        if (currentDate > eventDate) {
            setDropdownOpen(prevState => ({
                ...prevState,
                [id]: !prevState[id]
            }));
        } else {
            toast.error("You can update after the booked date");
        }
    };

    const handleSelectOption = async (option: string, bookingId: string) => {
        const updatedBooking = await updateBooking(bookingId, option);
        setDropdownOpen(prevState => ({
            ...prevState,
            [bookingId]: false
        }));

        if (option === 'Completed' || option === 'Cancelled') {
            setBookings(prev => prev.filter(booking => booking._id !== bookingId));
            setAcceptedBookings((prev:any) => [...prev, updatedBooking]);
        } else if (option === 'Pending') {
            setAcceptedBookings(prev => prev.filter(booking => booking._id !== bookingId));
            setBookings((prev:any) => [...prev, updatedBooking]);
        }
    };

    const handleOpenBilling = (booking: Booking) => {
        setSelectedBillBooking(booking);
        setShowSubmitBillModal(true);
    };

    const handleCloseBilling = () => {
        setSelectedBillBooking(null);
        setShowSubmitBillModal(false);
    };

    return (
        <div>
            <Toaster position='top-center'/>
            {acceptedBookings.length > 0 && (
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Accepted Bookings</h1>
                    <div className="overflow-x-auto bg-gray-700 text-white rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-600">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">SN</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Booked Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Client Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">More Info</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Submit Bill</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-600 divide-y divide-gray-500">
                                {acceptedBookings.map((booking, index) => (
                                    <tr key={booking._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(booking.eventDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.clientName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {booking.status !== 'Completed' && booking.status !== 'Pending' ? (
                                                <div className="relative inline-block text-left">
                                                    <button
                                                        onClick={() => toggleMenu(booking._id, new Date(booking.eventDate).toLocaleDateString())}
                                                        className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                                                        type="button"
                                                    >
                                                        {booking.status}
                                                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                        </svg>
                                                    </button>

                                                    {dropdownOpen[booking._id] && (
                                                        <div className="absolute bottom-full right-0 mb-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow flex">
                                                            <ul className="flex space-x-2 py-2 text-sm text-gray-700 dark:text-gray-200">
                                                                <li>
                                                                    <a
                                                                        href="#"
                                                                        onClick={() => handleSelectOption('Completed', booking._id)}
                                                                        className="block px-4 py-2 text-green-600"
                                                                    >
                                                                        Completed
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="#"
                                                                        onClick={() => handleSelectOption('Cancelled', booking._id)}
                                                                        className="block px-4 py-2 text-red-700"
                                                                    >
                                                                        Cancelled
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">{booking.status}</span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button className="text-blue-500 hover:text-blue-700" onClick={() => handleDetailsClick(booking)}>View Details</button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button className="text-green-500 hover:text-green-700" onClick={() => handleOpenBilling(booking)}>Submit Bill</button>
                                        </td>
                                        {showSubmitBillModal && (
                                            <Billing isOpen={showSubmitBillModal} bookingId={booking._id} onClose={handleCloseBilling} />
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {bookings.length > 0 && (
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Pending Bookings</h1>
                    <div className="overflow-x-auto bg-gray-700 text-white rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-600">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">SN</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Booked Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Client Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">More Info</th>

                                </tr>
                            </thead>
                            <tbody className="bg-gray-600 divide-y divide-gray-500">
                                {bookings.map((booking, index) => (
                                    <tr key={booking._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(booking.eventDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.clientName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button className="text-green-500 hover:text-green-700" onClick={() => handleAcceptClick(booking)}>Accept</button>
                                            <button className="text-red-500 hover:text-red-700 ms-2" onClick={() => handleCancelClick(booking)}>Cancel</button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button className="text-blue-500 hover:text-blue-300" onClick={() => handleDetailsClick(booking)}>More..</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showCancelModal && selectedBooking && (
                <div id="popup-modal" tabIndex={-1} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleCloseModal}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-6 text-center">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Cancel Booking</h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Are you sure you want to cancel this booking? The refund amount will be based on the cancellation policy.</p>
                                <div className="flex gap-4 mt-4">
                                    <button type="button" className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={handleConfirmCancel}>Confirm</button>
                                    <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={handleCloseModal}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAcceptModal && selectedBooking && (
                <div id="popup-modal" tabIndex={-1} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleCloseModal}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-6 text-center">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Accept Booking</h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Are you sure you want to accept this booking?</p>
                                <div className="flex gap-4 mt-4">
                                    <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleConfirmAccept}>Confirm</button>
                                    <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={handleCloseModal}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showDetailsModal && selectedBooking && (
                <div id="popup-modal" tabIndex={-1} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleCloseModal}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-6 text-center">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Booking Details</h3>
                                <div className="mt-4 text-left">
                                <p><strong>Client Name:</strong> {selectedBooking.clientName}</p>
                                    <p><strong>Event Date:</strong> {new Date(selectedBooking.eventDate).toLocaleDateString()}</p>
                                    <p><strong>Event:</strong> {selectedBooking.event}</p>
                                    <p><strong>Advance:</strong> {selectedBooking.advance}</p>
                                    <p><strong>Arrival Time:</strong> {selectedBooking.arrivalTime}</p>
                                    <p><strong>Email:</strong> {selectedBooking.email}</p>
                                    <p><strong>Ending Time:</strong> {selectedBooking.endingTime}</p>
                                    <p><strong>Guests:</strong> {selectedBooking.guests}</p>
                                    <p><strong>Location:</strong> {selectedBooking.location}</p>
                                    <p><strong>Phone Number:</strong> {selectedBooking.phoneNumber}</p>
                                    <p><strong>Pincode:</strong> {selectedBooking.pincode}</p>
                                </div>
                                <div className="flex gap-4 mt-4">
                                    <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={handleCloseModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Booking;
