import React from 'react';


import Sidebar from '../../../../compounents/admin/Sidebar';
import Header from '../../../../compounents/admin/Header';
import Payments from './Payments';
import { BillSection } from './BillSection';






const Dashboard: React.FC = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1">
        <Header name='Payments' />

        <Payments />
        <BillSection/>
      </div>
    </div>
  );
};

export default Dashboard;
