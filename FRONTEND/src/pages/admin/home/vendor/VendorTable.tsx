import React, { useEffect, useState } from 'react';
import { fetchVendors, blockorUnBlock } from '../../../../API/services/admin/Dashboard';

interface IVendor {
    map(arg0: (vendor: IVendor, index: number) => import("react/jsx-runtime").JSX.Element): React.ReactNode;

    _id?: string;
    email?: string;
    vendor?: boolean;
    phoneNum?: string;
    registered?: Date;
    vendorName?: string;
    blocked?: boolean;
    image:string;
}


const VendorTable = (list: any) => {
    const [vendors, setVendors] = useState<IVendor[]>([]);

    useEffect(() => {
        (async () => {
            const data: IVendor[] = await fetchVendors(list.list);
            setVendors(data);

        })();
    }, [list]);

    const blockandUnBlock = async (vendorId: string) => {
        try {
            const data = vendors.map((item:any) => {
                if (item._id === vendorId) { item.blocked = !item.blocked }
                return item;
            })

            setVendors(data);
            await blockorUnBlock(vendorId);
            
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-800 uppercase tracking-wider">
                vendor List
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
                    {vendors !== null && vendors.map((vendor: IVendor, index: number) => (
                        <tr key={vendor._id} className="cursor-pointer">
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex-shrink-0 w-10 h-10">
                                    <img className="w-full h-full rounded-full" src={vendor.image} alt={vendor.vendorName} />
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">{vendor.vendorName}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{vendor.email}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{vendor.phoneNum}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {vendor.registered && new Date(vendor.registered).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span
                                    onClick={() => blockandUnBlock(vendor._id + "")}
                                    className={`relative inline-block px-3 py-1 font-semibold leading-tight ${vendor.blocked ? 'text-green-900' : 'text-red-900'
                                        }`}
                                >
                                    <span
                                        aria-hidden
                                        className={`absolute inset-0 opacity-50 rounded-full ${vendor.blocked ? 'bg-green-900' : 'bg-red-200'
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

export default VendorTable;
