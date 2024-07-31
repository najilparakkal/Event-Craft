import React from 'react'
import Navbar from '../../../../compounents/vendor/Navbar'
import Section from '../Dashboard/Booking'

const Bookings:React.FC = () => {
  return (
    <div>
      <Navbar/>
      <Section/>
    </div>
  )
}   

export default React.memo(Bookings)
