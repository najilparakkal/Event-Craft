import { Navigate,Outlet } from "react-router";
import { useAppSelector } from "../costumeHooks/costum";



const Vendor :React.FC = () => {
    const vendorDetails = useAppSelector((state) => state.vendor.vendorDetails._id);
    return (
        vendorDetails ? <Outlet/>: <Navigate to={"/vendor/login"} />
  )
}

export default Vendor
