import { Navigate,Outlet } from "react-router";
import { useAppSelector } from "../costumeHooks/costum";



const User :React.FC = () => {
    const userDetails = useAppSelector((state) => state.user.userDetails);
    
    return (
    userDetails.email ? <Outlet/>: <Navigate to={"/login"} />
  )
}

export default User
