import { useLogout } from '../../../API/services/user/userAuthService';
import { useAppSelector } from '../../../costumeHooks/costum';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const userDetails = useAppSelector((state) => state.user.userDetails);
  const { email } = userDetails;
  const navigate = useNavigate();
  const handleLogout = useLogout(); 
  const logoutBtn = async ()=>{
    handleLogout();
    navigate("/login");
  }
  return (
    <div>
   
      <h1>HOME PAGE OF USER {email}</h1>
      <button onClick={logoutBtn} className='bg-red-900'> Logout</button>
    </div>
  );
};

export default Home;
