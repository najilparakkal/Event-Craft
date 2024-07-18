import React from 'react'
import ProfileHeader from '../../../../compounents/user/ProfileHeader'
import Profile from './Profile'

const profileSection: React.FC = () => {
    return (
        <div className='bg-black'>
            <ProfileHeader />
            <Profile/>
        </div>
    )
}

export default React.memo(profileSection)
