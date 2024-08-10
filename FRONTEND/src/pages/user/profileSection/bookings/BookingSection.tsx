import React from 'react';
import Bookings from './Bookings';
import Notification from '../../../../compounents/user/Notification';
import Header from '../../../../compounents/user/Header';

const BookingSection = () => {
  return (
    <div className="bg-black min-h-screen">
      <Header />
      
      <Notification />

      <div className="pt-9 px-4 sm:px-6 lg:px-8 mx-auto" style={{ maxWidth: '1280px' }}>
        <Bookings />
      </div>
    </div>
  );
};

export default React.memo(BookingSection);
