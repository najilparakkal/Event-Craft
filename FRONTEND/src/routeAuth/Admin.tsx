import React from 'react'
import Cookies from "js-cookie";
import { Navigate, Outlet } from 'react-router-dom';

const Admin = () => {
    const token = Cookies.get("adminToken")

    return (
        token ? <Outlet /> : <Navigate to={'/admin/login'} />
    )
}

export default Admin
