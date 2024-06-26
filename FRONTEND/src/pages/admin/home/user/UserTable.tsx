import React, { useEffect, useState } from 'react';

import { blockorUnBlockUsers, fetchUsers } from '../../../../API/services/admin/Dashboard';

interface User {
    map(arg0: (user: User, index: number) => import("react/jsx-runtime").JSX.Element): React.ReactNode;
    _id: string;
    userName: string;
    email: string;
    password: string;
    phoneNum: string;
    registered: string;
    image: string;
    blocked:string
}

const UserTable = (list: any) => {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        (async () => {
            const data: User[] = await fetchUsers(list.list);
            setUsers(data);
        })();
    }, [list])

    const blockandUnBlock = async (userId: string) => {
        try {
            const data = users.map((item:any) => {
                if (item._id === userId) { item.blocked = !item.blocked }
                return item;
            })

            setUsers(data);
            await blockorUnBlockUsers(userId);
            
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-800 uppercase tracking-wider">
                User List
            </div>
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            SL
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            PROFILE
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Phone
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Registered Date
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Action
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {users !== null && users.map((user: User, index: number) => (

                        <tr key={user._id} className="cursor-pointer">
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex-shrink-0 w-10 h-10">
                                    <img className="w-full h-full rounded-full" src={user.image} alt={user.userName} />
                                </div>              </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">

                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">{user.userName}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{user.phoneNum}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {new Date(user.registered).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span
                                onClick={()=>blockandUnBlock(user._id)}
                                    className={`relative inline-block px-3 py-1 font-semibold leading-tight ${user.blocked ? 'text-green-900' : 'text-red-900'
                                        }`}
                                >
                                    <span
                                        aria-hidden
                                        className={`absolute inset-0 opacity-50 rounded-full ${user.blocked ? 'bg-green-900' : 'bg-red-200'
                                            }`}
                                    ></span>
                                    <span className="relative">{user.blocked ? 'UnBlock' : 'Block'}</span>
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
