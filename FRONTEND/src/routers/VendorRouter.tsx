import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/vendor/authentications/Login";
import SignUp from "../pages/vendor/authentications/SignUp";
import Home from "../pages/vendor/home/Dashboard/Home";
import Otp from "../pages/vendor/authentications/Otp";
import ForgotPass from "../pages/vendor/authentications/ForgotPass";
import Services from "../pages/vendor/services/Services";
import License from "../pages/vendor/services/License";
import Post from "../pages/vendor/home/Post";
import Vendor from "../routeAuth/Vendor";
import MessageSection from "../pages/vendor/home/messages/MessageSection";
import Bookings from "../pages/vendor/home/Bookings/Bookings";
import { useAppSelector } from "../costumeHooks/costum";
import ProfileSection from "../pages/vendor/home/profile/ProfileSection";


const VendorRouter: React.FC = () => {
  const vendor = useAppSelector((state) => state.vendor.vendorDetails._id);
  

  return (
    <div>
      <Routes>
        <Route path="/login" element={vendor ? <Navigate to="/home" /> : <Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forgot" element={<ForgotPass />} />
        <Route path="" element={<Vendor />}>
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/license" element={<License />} />
          <Route path="/addPost/:id" element={<Post />} />
          <Route path="/messages" element={<MessageSection />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/profile" element={<ProfileSection />} />
        </Route>
      </Routes>
    </div>
  );
};

export default VendorRouter;
