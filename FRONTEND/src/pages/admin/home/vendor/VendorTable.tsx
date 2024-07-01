import React, { useEffect, useState } from 'react';
import { fetchVendors, blockorUnBlock } from '../../../../API/services/admin/Dashboard';

interface IVendor {
    _id?: string;
    email?: string;
    vendor?: boolean;
    phoneNum?: string;
    registered?: Date;
    vendorName?: string;
    blocked?: boolean;
    profilePicture?: string;
}

const VendorTable:React.FC = () => {
    const [vendors, setVendors] = useState<IVendor[]>([]);
    const [list, setList] = useState<string>("");

    useEffect(() => {
        (async () => {
            const data: IVendor[] = await fetchVendors(list);            
            setVendors(data);
        })();
    }, [list]);

    const blockandUnBlock = async (vendorId: string) => {
        try {
            const updatedVendors = vendors.map((vendor) => {
                if (vendor._id === vendorId) {
                    return { ...vendor, blocked: !vendor.blocked };
                }
                return vendor;
            });

            setVendors(updatedVendors);
            await blockorUnBlock(vendorId);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-[#292F45] m-2 shadow-md rounded-lg overflow-hidden">
            <div className="px-5 py-3 bg-[#292F45]  text-left text-lg font-semibold text-gray-500 uppercase tracking-wider">
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

            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 bg-[#353C56] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            SL
                        </th>
                        <th className="px-5 py-3 bg-[#353C56] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            PROFILE
                        </th>
                        <th className="px-5 py-3 bg-[#353C56] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-5 py-3 bg-[#353C56] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-5 py-3 bg-[#353C56] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            Phone
                        </th>
                        <th className="px-5 py-3 bg-[#353C56] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            Registered Date
                        </th>
                        <th className="px-5 py-3 bg-[#353C56] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {vendors !== null && vendors.map((vendor: IVendor, index: number) => (
                        <tr key={vendor._id} className="cursor-pointer">
                            <td className="px-5 py-5  bg-[#292F45]  text-sm">
                                <p className="text-gray-500 whitespace-no-wrap">{index + 1}</p>
                            </td>
                            <td className="px-5 py-5  bg-[#292F45]  text-sm">
                                <div className="flex-shrink-0 w-10 h-10">
                                    <img className="w-full h-full rounded-full" src={vendor.profilePicture} alt={vendor.vendorName} />
                                </div>
                            </td>
                            <td className="px-5 py-5  bg-[#292F45]  text-sm">
                                <div className="flex items-center">
                                    <div className="ml-3">
                                        <p className="text-gray-500 whitespace-no-wrap">{vendor.vendorName}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5  bg-[#292F45]  text-sm">
                                <p className="text-gray-500 whitespace-no-wrap">{vendor.email}</p>
                            </td>
                            <td className="px-5 py-5  bg-[#292F45]  text-sm">
                                <p className="text-gray-500 whitespace-no-wrap">{vendor.phoneNum}</p>
                            </td>
                            <td className="px-5 py-5  bg-[#292F45]  text-sm">
                                <p className="text-gray-500 whitespace-no-wrap">
                                    {vendor.registered && new Date(vendor.registered).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </td>
                            <td className="px-5 py-5  bg-[#292F45]  text-sm">
                                <span
                                    onClick={() => blockandUnBlock(vendor._id + "")}
                                    className={`relative inline-block px-3 py-1 font-semibold leading-tight ${vendor.blocked ? 'text-green-500' : 'text-white'
                                        }`}
                                >
                                    <span
                                        aria-hidden
                                        className={`absolute inset-0 opacity-50 rounded-full ${vendor.blocked ? 'bg-green-900' : 'bg-red-700'
                                            }`}
                                    ></span>
                                    <span className="relative">{vendor.blocked ? 'Unblock' : 'Block'}</span>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(VendorTable)
