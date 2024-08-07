import React from 'react'
import ProfileHeader from '../../../../compounents/user/ProfileHeader'
import Notification from '../../../../compounents/user/Notification'
import Bills from './Bills'
import PayedBills from './PayedBills'

const BillsSection = () => {
  return (
    <div>
      <ProfileHeader/>
      <Notification/>
      <Bills/>
      <PayedBills/>
    </div>
  )
}

export default BillsSection
