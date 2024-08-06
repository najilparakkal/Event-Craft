import React, { useEffect, useState } from 'react';
import { blockVendor, fetchReports, readReport } from '../../../../API/services/admin/Dashboard';
import Sidebar from '../../../../compounents/admin/Sidebar';
import Header from '../../../../compounents/admin/Header';
import toast from 'react-hot-toast';

interface Report {
  _id: string;
  userId: {
    userName: string;
    profilePicture: string;
  };
  vendorId: {
    vendorName: string;
    profilePicture: string;
    _id: string
  };
  reason: string;
  reasonExplained: string;
  isRead: boolean;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<Report[]>([]);

  useEffect(() => {
    fetchReports()
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const toggleRead = async (reportId: string) => {
    await readReport(reportId)
    setData((prevData) =>
      prevData.map((report) =>
        report._id === reportId ? { ...report, isRead: !report.isRead } : report
      )
    );
  };
  const handleBlock = async (reportId: string, vendorId: string) => {
    try {
      const response = await blockVendor(reportId, vendorId);
      if (response) {
        toast.success("Vendor Blocked")
      } else {
        toast.error("Sothing issue when blocking")
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-secondary">
        <Header name="Reports" />
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {data.map((report) => (
            <div key={report._id} className="relative flex items-center justify-center px-5 py-5">
              <div className="w-full max-w-xl px-5 pt-5 pb-10 mx-auto text-gray-800 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-50">

                <label
                  className="absolute top-4 right-4 inline-flex items-center cursor-pointer"
                  onClick={() => toggleRead(report._id)}
                >
                  {report.isRead ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="green"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7M5 9l4 4L19 3"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </label>


                <div className="w-full pt-1 pb-5 mx-auto -mt-16 text-center">
                  <a href="#" className="relative block">
                    <img
                      alt="user-profile"
                      src={report.userId.profilePicture}
                      className="mx-auto object-cover rounded-full h-20 w-20"
                    />
                  </a>
                </div>

                <div className="w-full mb-10">
                  <div className="relative flex justify-center">
                    <p className="px-10 text-sm text-center text-gray-600 dark:text-gray-100">
                      <span className="mr-4 text-3xl text-indigo-500 leading-tight">“</span>
                      {report.reasonExplained}
                      <span className="text-3xl ml-5 text-indigo-500 leading-tight">”</span>
                    </p>
                  </div>
                </div>

                <div className="w-full flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <img
                      alt="vendor-profile"
                      src={report.vendorId.profilePicture}
                      className="object-cover rounded-lg h-10 w-10"
                    />
                    <div className="text-sm">
                      <p className="text-gray-700 dark:text-gray-200">Vendor Name:</p>
                      <p className="font-bold text-indigo-500">{report.vendorId.vendorName}</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="font-bold text-indigo-500 text-md"><span className='text-white font-normal'>User : </span>{report.userId.userName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">Reason : <span className='text-indigo-500 font-bold'>{report.reason}</span></p>
                  </div>

                  <button className="flex items-center p-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">
                    <svg
                      onClick={() => handleBlock(report._id, report.vendorId._id)}
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 2304 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1728 448l-384 704h768zm-1280 0l-384 704h768zm821-192q-14 40-45.5 71.5t-71.5 45.5v1291h608q14 0 23 9t9 23v64q0 14-9 23t-23 9h-1344q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h608v-1291q-40-14-71.5-45.5t-45.5-71.5h-491q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h491q21-57 70-92.5t111-35.5 111 35.5 70 92.5h491q14 0 23 9t9 23v64q0 14-9 23t-23 9h-491zm-181 16q33 0 56.5-23.5t23.5-56.5-23.5-56.5-56.5-23.5-56.5 23.5-23.5 56.5 23.5 56.5 56.5 23.5zm1088 880q0 73-46.5 131t-117.5 91-144.5 49.5-139.5 16.5-139.5-16.5-144.5-49.5-117.5-91-46.5-131q0-11 35-81t92-174.5 107-195.5 102-184 56-100q18-33 56-33t56 33q4 7 56 100t102 184 107 195.5 92 174.5 35 81zm-1280 0q0 73-46.5 131t-117.5 91-144.5 49.5-139.5 16.5-139.5-16.5-144.5-49.5-117.5-91-46.5-131q0-11 35-81t92-174.5 107-195.5 102-184 56-100q18-33 56-33t56 33q4 7 56 100t102 184 107 195.5 92 174.5 35 81z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
