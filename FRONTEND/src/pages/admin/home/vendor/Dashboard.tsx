
import Sidebar from '../../../../compounents/admin/Sidebar';
import Header from '../../../../compounents/admin/Header';

import VendorTable from './VendorTable';

const Dashboard = () => {
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ">
        <Header name='Vendors List'/>
       
         <VendorTable />
        </div>
      </div>
  );
};

export default Dashboard;
