import React from 'react';


import Sidebar from '../../../../compounents/admin/Sidebar';
import Header from '../../../../compounents/admin/Header';
import ListRequest from './ListRequest';






const Dashboard: React.FC = () => {


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header name='Vendor Requests'/>
        <ListRequest />

      </div>
    </div>
  );
};

export default React.memo(Dashboard);
