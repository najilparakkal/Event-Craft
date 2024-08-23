import React, { useEffect, useState } from 'react';
import { fetchCanelldBookings, refundUser } from '../../../../API/services/admin/Dashboard';
import { toast, Toaster } from 'react-hot-toast';

interface Booking {
  _id: string;
  bookingId: string;
  advance: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  vendorId: string;
  paymentId: string;
}

const Payments: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [_isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const datas = await fetchCanelldBookings();
      setBookings(datas);
    };
    fetch();

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setIsRazorpayLoaded(true);
    script.onerror = () => {
      setIsRazorpayLoaded(false);
      toast.error("Failed to load Razorpay SDK");
    };
    document.body.appendChild(script);
  }, []);

  const handleRefundClick = async (bookingId: string, paymentId: string) => {
    toast.promise(
      refundUser(bookingId, paymentId),
      {
        loading: 'Processing refund...',
        success: 'Refunded successfully',
        error: 'Failed to refund'
      }
    ).then(() => {
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.bookingId !== bookingId));
    });
  };

  return (
    <div className="p-4">
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-2xl font-bold mb-4 text-gray-800">Payments</h1>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        {bookings.length === 0 ? (
          <div className="text-3xl font-bold text-center text-gray-500">NO CANCEL BOOKINGS</div>
        ) : (
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr>
                <th className="py-2 bg-[#353C56] px-4 border-b border-black text-gray-300 text-left rounded-tl-lg">
                  SN
                </th>
                <th className="py-2 bg-[#353C56] px-4 border-b border-black text-gray-300 text-left">
                  Booking ID
                </th>
                <th className="py-2 bg-[#353C56] px-4 border-b border-black text-gray-300 text-left">
                  Advance
                </th>
                <th className="py-2 bg-[#353C56] px-4 border-b border-black text-gray-300 text-left">
                  Requested
                </th>
                <th className="py-2 bg-[#353C56] px-4 border-b border-black text-gray-300 text-left rounded-tr-lg">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td className="py-2 px-4 bg-[#292F45]">{index + 1}</td>
                  <td className="py-2 px-4 bg-[#292F45]">{booking.bookingId.substring(0, 7)}...</td>
                  <td className="py-2 px-4 bg-[#292F45]">{booking.advance}</td>
                  <td className="py-2 px-4 bg-[#292F45]">{new Date(booking.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 bg-[#292F45]">
                    <button
                      className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                      onClick={() => handleRefundClick(booking.bookingId, booking.paymentId)}
                    >
                      Refund
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default React.memo(Payments);
