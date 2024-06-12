import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './pages/user/authotications/Signup';
import Otp from "./pages/user/authotications/Otp";
import { ToastContainer } from 'react-toastify';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />

        <Route path="/otp" element={<Otp />} />
      </Routes>
    </Router>
    // </div>


  );
}
export default App;
