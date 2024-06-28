import React, { useEffect } from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faUsers, faUserPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../../../compounents/admin/Sidebar';
import Header from '../../../../compounents/admin/Header';
import DashboardCard from '../../../../compounents/admin/DashboardCard';
import { fetchRequest } from '../../../../API/services/admin/Dashboard';
import ListRequest from './ListRequest';






const Dashboard: React.FC = () => {


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-secondary">
        <Header />
        <ListRequest />

      </div>
    </div>
  );
};

export default Dashboard;
