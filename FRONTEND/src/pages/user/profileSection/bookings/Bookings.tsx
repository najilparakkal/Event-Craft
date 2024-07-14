import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../costumeHooks/costum';
import { cancelBooking, vendorBookings } from '../../../../API/services/user/Services';

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
}

const Bookings: React.FC = () => {
  const { _id } = useAppSelector((state) => state.user.userDetails);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [refundPercentage, setRefundPercentage] = useState<number>(0);

  useEffect(() => {
    const fetchBookings = async () => {
      const datas = await vendorBookings(_id + "");
      setBookings(datas);
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
    setRefundPercentage(refund);
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
    setRefundPercentage(0);
  };

  const handleConfirmCancel = async () => {
    if (selectedBooking) {
      await cancelBooking(refundPercentage, selectedBooking._id);
      setBookings((prevBookings) => prevBookings.filter(booking => booking._id !== selectedBooking._id));

      handleCloseModal();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <div className="grid grid-cols-6 gap-4 p-2 bg-gray-700 text-white">
        <div className="font-bold">SN</div>
        <div className="font-bold">Booked Date</div>
        <div className="font-bold">Vendor Name</div>
        <div className="font-bold">Event</div>
        <div className="font-bold">Advance</div>
        <div className="font-bold">Action</div>
      </div>
      {bookings.map((booking, index) => (
        <div key={booking._id} className="grid grid-cols-6 gap-4 p-2 bg-gray-500 text-white">
          <div>{index + 1}</div>
          <div>{new Date(booking.eventDate).toLocaleDateString()}</div>
          <div>{booking.vendorName}</div>
          <div>{booking.event}</div>
          <div>{booking.advance}</div>
          <div className="flex">
            <button className="text-red-500" onClick={() => handleCancelClick(booking)}>Cancel</button>
          </div>
        </div>
      ))}
      {showModal && selectedBooking && (
        <div id="popup-modal" tabIndex={-1} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleCloseModal}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to cancel the booking?</h3>
                <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                  {`If you cancel now, you will get ${refundPercentage}% of the money back.`}
                </p>
                <button className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" onClick={handleConfirmCancel}>
                  Yes, I'm sure
                </button>
                <button className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={handleCloseModal}>
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Bookings);
