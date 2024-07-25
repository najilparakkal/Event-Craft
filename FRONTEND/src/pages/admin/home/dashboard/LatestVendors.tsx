import React from 'react';

interface Vendor {
    _id: string;
    profilePicture: string;
    registered: string;
    verified: boolean;
    vendorName: string;
}

interface LatestVendorsProps {
    vendors: Vendor[];
}

const LatestVendors: React.FC<LatestVendorsProps> = ({ vendors }) => {
    return (
        <div className="bg-[#292F45] m-2 shadow-md rounded-lg overflow-hidden">
            <div className="px-5 py-3 bg-[#292F45] text-left text-lg font-semibold text-gray-500 uppercase tracking-wider">
                Latest Vendors
            </div>
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 bg-[#353C56] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            Profile
                        </th>
                        <th className="px-5 py-3 bg-[#353C56] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-5 py-3 bg-[#353C56] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            Created At
                        </th>
                        <th className="px-5 py-3 bg-[#353C56] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {vendors.map((vendor) => (
                        <tr key={vendor._id} className="cursor-pointer">
                            <td className="px-5 py-5 bg-[#292F45] text-sm">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10">
                                        <img
                                            alt="profile"
                                            src={vendor.profilePicture}
                                            className="w-full h-full rounded-full"
                                        />
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 bg-[#292F45] text-sm">
                                <p className="text-gray-500 whitespace-no-wrap">
                                    {vendor.vendorName || 'N/A'}
                                </p>
                            </td>
                            <td className="px-5 py-5 bg-[#292F45] text-sm">
                                <p className="text-gray-500 whitespace-no-wrap">
                                    {new Date(vendor.registered).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </td>
                            <td className="px-5 py-5 bg-[#292F45] text-sm">
                                <span
                                    className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                                        vendor.verified ? 'text-green-500' : 'text-red-500'
                                    }`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`absolute inset-0 ${vendor.verified ? 'bg-green-200' : 'bg-red-200'} rounded-full opacity-50`}
                                    ></span>
                                    <span className="relative">
                                        {vendor.verified ? 'Active' : 'Inactive'}
                                    </span>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> 
        </div>
    );
};

export default React.memo(LatestVendors);
