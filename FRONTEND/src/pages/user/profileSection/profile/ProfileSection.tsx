import React from 'react'
import ProfileHeader from '../../../../compounents/user/ProfileHeader'
import Profile from './Profile'
import Notification from '../../../../compounents/user/Notification'

const profileSection: React.FC = () => {
    return (
        <div className='bg-black'>
            <ProfileHeader />
            <Notification/>

            <Profile/>
        </div>
    )
}

export default React.memo(profileSection)
