
import Sidebar from '../../../../compounents/admin/Sidebar';
import Header from '../../../../compounents/admin/Header';
import Vendor from './Vendor';
import { useState } from 'react';
import VendorTable from './VendorTable';

const Dashboard = () => {
  const [list, setList] = useState("");
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold mb-4">User List</h1>
            <div className="relative inline-block text-left">
              <select
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 shadow-lg hover:shadow-2xl transition-shadow duration-200"
                onChange={(e) => setList(e.target.value)}
                value={list}
              >
                <option value="">SORT</option>
                <option value="ascending">ASCENDING</option>
                <option value="descending">DESCENDING</option>
                <option value="notVerified">BLOCKED</option>
                <option value="verified">UNBLOCKED</option>
                <option value="date">DATE</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
          </div>
         <VendorTable list={list}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
