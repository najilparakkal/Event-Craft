import { Routes, Route } from "react-router-dom";
import Login from "../pages/admin/authentication/Login";
import Home from "../pages/admin/home/dashboard/Home";
import User from "../pages/admin/home/user/User";
import Vendor from "../pages/admin/home/vendor/Vendor";
import Categories from "../pages/admin/home/categories/Categories";
import Requtes from "../pages/admin/home/Requstes/Requests";
import Dashboard from "../pages/admin/home/payments/Dashboard";
import Reports from "../pages/admin/home/reports/Reports";
import Cookies from "js-cookie";
import Admin from "../routeAuth/Admin";

const UserRouter: React.FC = () => {
    const token = Cookies.get("adminToken")
    return (
        <Routes>
            <Route path="/login" element={token ? <Home /> : <Login />} />
            <Route path="" element={<Admin />}>
                <Route path="/Dashboard" element={<Home />} />
                <Route path="/Users" element={< User />} />
                <Route path="/Vendors" element={< Vendor />} />
                <Route path="/Categories" element={< Categories />} />
                <Route path="/Payments" element={< Dashboard />} />
                <Route path="/Requests" element={<Requtes />} />
                <Route path='/Reports' element={<Reports />} />
            </Route>
        </Routes>
    )
}

export default UserRouter
