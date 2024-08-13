import React, { useEffect, useState } from 'react';
import { blockorUnBlockUsers, fetchUsers } from '../../../../API/services/admin/Dashboard';

interface User {
  _id: string;
  userName: string;
  email: string;
  password: string;
  phoneNum: string;
  registered: string;
  image: string;
  blocked: boolean; 
}

const UserTable:React.FC = () => {
  const [list, setList] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const data: User[] = await fetchUsers(list);
      setUsers(data);
    })();
  }, [list]);

  const blockandUnBlock = async (userId: string) => {
    try {
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          return { ...user, blocked: !user.blocked };
        }
        return user;
      });

      setUsers(updatedUsers);
      await blockorUnBlockUsers(userId);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <div className="bg-[#292F45] shadow-md rounded-lg m-2 overflow-hidden">
      <div className="px-4 py-3 bg-transparent justify-end text-left text-sm transition-shadow duration-500 text-gray-800 uppercase tracking-wider">
        <div className="flex justify-end items-center">
          <div className="relative inline-block text-left">
            <select
              className="block appearance-none w-full bg-[#33375C] border border-[#33375C] text-gray-300 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-[#33375C] focus:border-[#33375C] shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:scale-105"
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
      </div>

      <table className="min-w-full leading-normal">
        <thead className=''>
          <tr>
            <th className="px-5 py-3 border-b-2  border-black bg-[#353C56] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
              SL
            </th>
            <th className="px-5 py-3 border-b-2 border-black bg-[#353C56] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
              PROFILE
            </th>
            <th className="px-5 py-3 border-b-2 border-black bg-[#353C56] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th className="px-5 py-3 border-b-2 border-black bg-[#353C56] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Email
            </th>
            <th className="px-5 py-3 border-b-2 border-black bg-[#353C56] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-5 py-3 border-b-2 border-black bg-[#353C56] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Registered Date
            </th>
            <th className="px-5 py-3 border-b-2 border-black bg-[#353C56] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody className=''>
          {users.map((user, index) => (
            <tr key={user._id} className="cursor-pointer">
              <td className="px-5 py-5 bg-[#292F45] text-sm">
                <p className="text-gray-500 whitespace-no-wrap">{index + 1}</p>
              </td>
              <td className="px-5 py-5 bg-[#292F45] text-sm">
                <div className="flex-shrink-0 w-10 h-10">
                  <img className="w-full h-full rounded-full" src={user.image} alt={user.userName} />
                </div>
              </td>
              <td className="px-5 py-5 bg-[#292F45] text-sm">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-gray-500 whitespace-no-wrap">{user.userName}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 bg-[#292F45] text-sm">
                <p className="text-gray-500 whitespace-no-wrap">{user.email}</p>
              </td>
              <td className="px-5 py-5 bg-[#292F45] text-sm">
                <p className="text-gray-500 whitespace-no-wrap">{user.phoneNum}</p>
              </td>
              <td className="px-5 py-5 bg-[#292F45] text-sm">
                <p className="text-gray-500 whitespace-no-wrap">
                  {new Date(user.registered).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </td>
              <td className="px-5 py-5 bg-[#292F45] text-sm">
                <span
                  onClick={() => blockandUnBlock(user._id)}
                  className={`relative inline-block px-3 py-1 font-semibold leading-tight ${user.blocked ? 'text-green-500' : 'text-white'}`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-0 opacity-50 rounded-full ${user.blocked ? 'bg-green-900' : 'bg-red-700'}`}
                  ></span>
                  <span className="relative">{user.blocked ? 'Unblock' : 'Block'}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(UserTable);
