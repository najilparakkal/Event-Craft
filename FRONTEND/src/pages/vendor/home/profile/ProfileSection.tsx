import React from 'react'
import Navbar from '../../../../compounents/vendor/Navbar'
import Profile from './Profile'

const ProfileSection: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Profile />
        </div>
    )
}

export default React.memo(ProfileSection)
