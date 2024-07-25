import React, { useEffect, useState } from 'react';
import TransactionGraph from './TransactionGraph';
import { fetchDetails } from '../../../../API/services/admin/Dashboard';
import Counts from './Counts';
import Sidebar from '../../../../compounents/admin/Sidebar';
import Header from '../../../../compounents/admin/Header';
import BookingGraph from './BookingGraph';
import LatestUsers from './LatestUsers';
import LatestVendors from './LatestVendors';

interface DashboardData {
  usersCount: number;
  bookingsCount: number;
  vendorsCount: number;
  usersDates: [];
  vendorsDates: [];
  latestUsers: [];
  latestVendors: [];
}

const Dashboard: React.FC = () => {
  const [datas, setDatas] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const details: DashboardData = await fetchDetails();
      setDatas(details);
    };
    fetch();
  }, []);

  return (
    <div className="flex bg-[#171E31]">
      <Sidebar />
      <div className="flex-1 bg-secondary">
        <Header name="Dashboard" />
        {datas && (
          <div className='p-4'>
            <Counts
              bookingsCount={datas.bookingsCount}
              usersCount={datas.usersCount}
              vendorsCount={datas.vendorsCount}
            />
            <div className='flex p-4 space-x-4'>
              <div className='flex-1'>
                <TransactionGraph
                  usersDetails={datas.usersDates}
                  vendorsDetails={datas.vendorsDates}
                />
              </div>
              <div className='flex-1'>
                <BookingGraph />
              </div>
            </div>
            <div className='flex p-4 space-x-4'>
              <div className='flex-1'>
                <LatestUsers users={datas.latestUsers} />
              </div>
              <div className='flex-1'>
                <LatestVendors vendors={datas.latestVendors} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
