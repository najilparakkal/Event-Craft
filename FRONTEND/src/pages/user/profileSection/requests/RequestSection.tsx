import React from 'react'
import ProfileHeader from '../../../../compounents/user/ProfileHeader'
import Request from './Request'

const RequestSection = () => {
  return (
    <div>
      <ProfileHeader/>
      <Request/>
    </div>
  )
}

export default React.memo(RequestSection)
