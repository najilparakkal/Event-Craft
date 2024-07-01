import React from 'react'
import Dashboard from './Dashboard'

const Vendor:React.FC = () => {
  return (
    <div className='bg-[#171E31]'>
      <Dashboard/>
    </div>
  )
}

export default React.memo(Vendor)
