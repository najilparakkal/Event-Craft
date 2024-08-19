import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../costumeHooks/costum';
import { fetchEnquerys, readEnqury } from '../../API/services/vendor/services';
import { toast } from 'react-hot-toast';

interface ModalProps {
    isOpen: boolean;
    onClose: any;
}

interface IEnquiry {
    _id: string;
    userId: string;
    phoneNumber: string;
    reason: string;
    createdAt: string;
    updatedAt: string;
    vendorReaded: string[];
}

const Enquery: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [data, setData] = useState<IEnquiry[]>([]);
    const { _id } = useAppSelector((state) => state.vendor.vendorDetails);

    useEffect(() => {
        fetchEnquerys(_id + "")
            .then((response) => {
                setData(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [_id]);

    const toggleRead = async (dataId: string) => {
        const readData = await readEnqury(_id + "", dataId);
        if (readData) {
            toast.success("Read");
            setData((prevData: any) => 
                prevData.filter((item: IEnquiry) => item._id !== dataId)
            );
        } else {
            toast.error("Something went wrong");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 sm:p-6 lg:p-8">
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg relative max-w-full sm:max-w-lg lg:max-w-3xl w-full">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="overflow-y-auto max-h-96">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-2 sm:px-4">SN</th>
                                <th className="py-2 px-2 sm:px-4 w-full sm:w-1/2">Need</th>
                                <th className="py-2 px-2 sm:px-4">Phone No.</th>
                                <th className="py-2 px-2 sm:px-4">Requested</th>
                                <th className="py-2 px-2 sm:px-4">Read</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item._id}>
                                    <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm">{index + 1}</td>
                                    <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm">{item.reason}</td>
                                    <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm">{item.phoneNumber}</td>
                                    <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm">
                                        <button onClick={() => toggleRead(item._id)} className="flex items-center">
                                            {item.vendorReaded.includes(_id + "") ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="green"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="2"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7M5 9l4 4L19 3" />
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
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Enquery);
