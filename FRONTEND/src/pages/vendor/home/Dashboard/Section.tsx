import React from 'react'
import DatePicker from './DatePicker'
import { useAppSelector } from '../../../../costumeHooks/costum';

const Section:React.FC = () => {

  const { _id } = useAppSelector((state) => state.vendor.vendorDetails);

  return (
    <div className='flex w-full'>
      <div className='w-3/4'>
      <h1> Vendor DashBoard</h1>
      </div>

      <div className='w-1/4'>
        <DatePicker vendorId={_id}/>
      </div>
    </div>
  )
}

export default React.memo(Section)
