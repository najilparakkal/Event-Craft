import React from 'react';


import Sidebar from '../../../../compounents/admin/Sidebar';
import Header from '../../../../compounents/admin/Header';
import Section from './Section';






const Dashboard: React.FC = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1">
        <Header name='Services' />

        <Section />

      </div>
    </div>
  );
};

export default Dashboard;
