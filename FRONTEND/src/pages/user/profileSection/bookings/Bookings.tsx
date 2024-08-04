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
  status: string;
  accepted: boolean;
}

const Bookings: React.FC = () => {
  const { _id } = useAppSelector((state) => state.user.userDetails);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cancelledBookings, setCancelledBookings] = useState<string[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const datas = await vendorBookings(_id+"");
      setBookings(datas);
    };
    fetchBookings();
  }, [_id]);

  const handleCancelClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const handleConfirmCancel = async () => {
    if (selectedBooking) {
      await cancelBooking(selectedBooking._id);
      setCancelledBookings((prev) => [...prev, selectedBooking._id]);
      handleCloseModal();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Bookings</h1>
      <div className="grid grid-cols-6 gap-4 p-2 bg-gray-100 text-gray-700 font-medium">
        <div>SN</div>
        <div>Booked Date</div>
        <div>Vendor Name</div>
        <div>Event</div>
        <div>Advance</div>
        <div>Action</div>
      </div>
      {bookings.map((booking, index) => (
        <div key={booking._id} className="grid grid-cols-6 gap-4 p-2 bg-white text-gray-800 border-b border-gray-200">
          <div>{index + 1}</div>
          <div>{new Date(booking.eventDate).toLocaleDateString()}</div>
          <div>{booking.vendorName}</div>
          <div>{booking.event}</div>
          <div>{booking.advance}</div>
          <div className="flex">
            {booking.accepted ? (
              <span className="text-green-600">Vendor Accepted</span>
            ) : booking.status === 'pending' ? (
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleCancelClick(booking)}
                disabled={cancelledBookings.includes(booking._id)}
              >
                {cancelledBookings.includes(booking._id) ? 'Requested to cancel' : 'Cancel ?'}
              </button>
            ) : booking.status === 'cancelled' && !booking.accepted ? (
              <span className='text-blue-500'>Refunded</span>
            ) : (
              <span className='text-green-600'>Requested to cancel</span>
            )}
          </div>
        </div>
      ))}
      {showModal && selectedBooking && (
        <div
          id="popup-modal"
          tabIndex={-1}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-lg">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                onClick={handleCloseModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  className="mx-auto mb-4 text-red-700 w-12 h-12"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-700">Are you sure you want to cancel the booking?</h3>
                <p className='mb-5 text-gray-400'>It Will Take a Some Time</p>
                <button
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={handleConfirmCancel}
                >
                  Yes, I'm sure
                </button>
                <button
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                  onClick={handleCloseModal}
                >
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
