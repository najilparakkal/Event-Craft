import {   Routes, Route } from "react-router-dom";
import Signup from "../pages/user/authentications/Signup";
import Otp from "../pages/user/authentications/Otp";
import Login from "../pages/user/authentications/Login";
import ForgotPass from "../pages/user/authentications/ForgotPass";
import User from "../routeAuth/User";
import Home from "../pages/user/homePage/Home";




const UserRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<ForgotPass />} />
            <Route path="" element={<User />}>
                <Route path="/home" element={<Home />} />
            </Route>
        </Routes>
    )
}

export default UserRouter
