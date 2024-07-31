import React from 'react'
import DatePicker from './DatePicker'
import { useAppSelector } from '../../../../costumeHooks/costum';
import Booking from './Booking';
import { Wallet } from './Wallet';
import Billing from './Billing';

const Section: React.FC = () => {

  const { _id } = useAppSelector((state) => state.vendor.vendorDetails);

  return (
    <div className='flex w-full'>

      <div className='w-1/4 mt-5'>
        <DatePicker vendorId={_id} />
        <Wallet/>
      </div>
      <div className='w-3/4'>
        <Booking />
        <Billing/>
      </div>
    </div>
  )
}

export default React.memo(Section)
