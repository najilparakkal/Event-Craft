import { Routes, Route } from "react-router-dom";
import Login from "../pages/admin/authentication/Login";
import Home from "../pages/admin/home/dashboard/Home";
import User from "../pages/admin/home/user/User";
import Vendor from "../pages/admin/home/vendor/Vendor";
import Categories from "../pages/admin/home/categories/Categories";
import Requtes from "../pages/admin/home/Requstes/Requests";
import Dashboard from "../pages/admin/home/payments/Dashboard";

const UserRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/Dashboard" element={<Home />} />
            <Route path="/Users" element={< User />} />
            <Route path="/Vendors" element={< Vendor />} />
            <Route path="/Categories" element={< Categories />} />
            <Route path="/Payments" element={< Dashboard />} />
            <Route path="/Requests" element={<Requtes />} />

        </Routes>
    )
}

export default UserRouter
