import { Routes, Route } from "react-router-dom";
import Login from "../pages/admin/authentication/Login";
import Home from "../pages/admin/home/dashboard/Home";
import User from "../pages/admin/home/user/User";
import Vendor from "../pages/admin/home/vendor/Vendor";
import Categories from "../pages/admin/home/categories/Categories";
import Payments from "../pages/admin/home/payments/Payments";
import Reports from "../pages/admin/home/reports/Reports";
import Requtes from "../pages/admin/home/Requstes/Requests";

const UserRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/Dashboard" element={<Home />} />
            <Route path="/Users" element={< User />} />
            <Route path="/Vendors" element={< Vendor />} />
            <Route path="/Categories" element={< Categories />} />
            <Route path="/Payments" element={< Payments />} />
            <Route path="/Requests" element={<Requtes />} />

        </Routes>
    )
}

export default UserRouter
