import React from "react"
import { Routes, Route } from "react-router-dom";
import Login from "../pages/vendor/authentications/Login";
import SignUp from "../pages/vendor/authentications/SignUp";
import Home from "../pages/vendor/home/Home";
import Otp from "../pages/vendor/authentications/Otp";
import ForgotPass from "../pages/vendor/authentications/ForgotPass";
import Services from "../pages/vendor/services/Services";
import License from "../pages/vendor/services/License";

const VendorRouter: React.FC = () => {
  return (
    <div>
      <Routes>


        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forgot" element={<ForgotPass />} />
        <Route path="/services" element={<Services />} />
        <Route path="/license" element={<License />} />
        
      </Routes>
    </div>
  )
}

export default VendorRouter
