import React from 'react';
import { useAppSelector } from '../../../costumeHooks/costum';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const userDetails = useAppSelector((state) => state.user.userDetails);
  const { email } = userDetails;
  const navigate = useNavigate();

  return (
    <div>
      <h1>{email}</h1>
      <h1 onClick={() => navigate("/login")}>login</h1>
      <h1 onClick={() => navigate("/signup")}>signup</h1>
    </div>
  );
};

export default Home;
