import React from 'react'
import Navbar from '../../../../compounents/vendor/Navbar'
import Profile from './Profile'
import Notification from '../../../../compounents/vendor/Notification'

const ProfileSection: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Notification/>
            <Profile />
        </div>
    )
}

export default React.memo(ProfileSection)
