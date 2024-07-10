import React from 'react'
import ProfileHeader from '../../../../compounents/user/ProfileHeader'
import Bookings from './Bookings'

const BookingSection = () => {
  return (
    <div>
      <ProfileHeader/>
      <Bookings/>
    </div>
  )
}

export default React.memo(BookingSection)
