import React from 'react'
import ProfileHeader from '../../../../compounents/user/ProfileHeader'
import WishList from './WishList'

const WishlistSection:React.FC = () => {
  return (
    <div>
      <ProfileHeader/>
      <WishList/>
    </div>
  )
}

export default WishlistSection
