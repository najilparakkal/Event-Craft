import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './pages/user/authentications/Signup';
import Otp from "./pages/user/authentications/Otp";
import Home from "./pages/user/homePage/Home";
import Login from "./pages/user/authentications/Login";
import ForgotPass from "./pages/user/authentications/ForgotPass";
import OuterPage from "./pages/outerPage/OuterPage";

function App() {
  return (
    <>
      <Router>  
        <Routes>
          <Route path="/" element={< OuterPage/>} />
          
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot" element={<ForgotPass />} />
          
        </Routes>
      </Router>
     
    </>
  );
}
export default App;
