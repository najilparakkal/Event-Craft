import React from "react"
import { Routes, Route } from "react-router-dom";
import Login from "../pages/vendor/authentications/Login";
import SignUp from "../pages/vendor/authentications/SignUp";
import Home from "../pages/vendor/home/Home";
import Otp from "../pages/vendor/authentications/Otp";
import ForgotPass from "../pages/vendor/authentications/ForgotPass";
import Services from "../pages/vendor/services/Services";
import License from "../pages/vendor/services/License";
import Post from "../pages/vendor/home/Post";
import Vendor from "../routeAuth/Vendor";
import Requests from "../pages/vendor/home/Requests";
import MessageSection from "../pages/vendor/home/messages/MessageSection";

const VendorRouter: React.FC = () => {
  return (
    <div>
      <Routes>


        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forgot" element={<ForgotPass />} />

        <Route path="" element={<Vendor />}>
            <Route path="/home" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/license" element={<License />} />
            <Route path="/addPost/:id" element={<Post />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/messages" element={<MessageSection />} />
        </Route>
      </Routes>
    </div>
  )
}

export default VendorRouter
