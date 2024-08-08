import React from 'react';
import DatePicker from './DatePicker';
import { useAppSelector } from '../../../../costumeHooks/costum';
import Booking from './Booking';
import { Wallet } from './Wallet';
import Reviews from './Reviews';
import Notification from '../../../../compounents/vendor/Notification';

const Section: React.FC = () => {
  const { _id } = useAppSelector((state) => state.vendor.vendorDetails);

  return (
    <div className='w-full'>
      <Notification/>
      <div className="flex flex-col md:flex-row w-full mt-5">
        <div className="w-full md:w-1/4 p-4">
          <DatePicker vendorId={_id+""} />
          <Wallet vendorId={_id+""}/>
        </div>
        <div className="w-full md:w-3/4 p-4">
          <Reviews />
        </div>
      </div>
      <Booking />
    </div>

  );
};

export default React.memo(Section);
