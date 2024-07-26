import React from 'react';


import Sidebar from '../../../../compounents/admin/Sidebar';
import Header from '../../../../compounents/admin/Header';
import Payments from './Payments';






const Dashboard: React.FC = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1">
        <Header name='Payments' />

        <Payments />

      </div>
    </div>
  );
};

export default Dashboard;
