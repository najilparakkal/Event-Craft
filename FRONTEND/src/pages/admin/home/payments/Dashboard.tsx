import React from 'react';


import Sidebar from '../../../../compounents/admin/Sidebar';
import Header from '../../../../compounents/admin/Header';
import Payments from './Payments';
import { BillSection } from './BillSection';






const Dashboard: React.FC = () => {
  return (
    <div className="flex bg-[#171E31] min-h-screen max-h-screen ">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Header name='Payments' />
      
      <main className="flex-1 p-4 overflow-x-auto">
        <Payments />
        <BillSection />
      </main>
    </div>
  </div>
  );
};

export default Dashboard;
