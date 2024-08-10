import React from 'react'
import Notification from '../../../../compounents/user/Notification'
import Bills from './Bills'
import PayedBills from './PayedBills'
import Header from '../../../../compounents/user/Header'

const BillsSection: React.FC = () => {
  return (
    <div className="bg-black min-h-screen max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <Notification />
      <Header />
      <div className="pt-20">
        <Bills />
        <PayedBills />
      </div>
    </div>
  )
}

export default React.memo(BillsSection)
