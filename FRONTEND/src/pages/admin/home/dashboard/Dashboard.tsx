import React from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faUsers, faUserPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../../../compounents/admin/Sidebar';
import Header from '../../../../compounents/admin/Header';
import DashboardCard from '../../../../compounents/admin/DashboardCard';






const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-secondary">
        <Header name="Dashboard" />
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard title="Today's Money" value="$53,000" description="+55% since yesterday" icon={<FontAwesomeIcon icon={faDollarSign} />} bgColor="bg-primary" />
          <DashboardCard title="Today's Users" value="2,300" description="+3% since last week" icon={<FontAwesomeIcon icon={faUsers} />} bgColor="bg-accent" />
          <DashboardCard title="New Clients" value="+3,462" description="-2% since last quarter" icon={<FontAwesomeIcon icon={faUserPlus} />} bgColor="bg-dark" />
          <DashboardCard title="Sales" value="$103,430" description="+5% than last month" icon={<FontAwesomeIcon icon={faShoppingCart} />} bgColor="bg-primary" />
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h1>Dashboard</h1>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
