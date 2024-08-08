import React from 'react'
import Dashboard from './Dashboard'

const Home: React.FC = () => {
  return (
    <div className='bg-[#171E31]'>
      <Dashboard />

    </div>

  )
}

export default React.memo(Home)
