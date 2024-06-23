import { Navigate,Outlet } from "react-router";
import { useAppSelector } from "../costumeHooks/costum";



const Vendor :React.FC = () => {
    const vendorDetails = useAppSelector((state) => state.vendor.vendorDetails);
    
    return (
        vendorDetails ? <Outlet/>: <Navigate to={"/login"} />
  )
}

export default Vendor
