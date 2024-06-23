import React from 'react'
import { useAppSelector } from '../../../costumeHooks/costum'
// import { useNavigate } from 'react-router-dom'

const Home:React.FC = () => {

    const vendorDetails = useAppSelector((state)=>state.vendor.vendorDetails)
    const {email} = vendorDetails
    // const navigate = useNavigate()
  return (
    <div>
      
      <h1>home </h1>
      <h3>vendor :  {email}</h3>
    </div>
  )
}

export default Home
