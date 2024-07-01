import React, { useEffect, useState } from 'react';
import { fetchRequest, acceptVendor, rejectVendor } from '../../../../API/services/admin/Dashboard';
import { toast, Toaster } from 'react-hot-toast';
import ReasonModal from './ReasonModal';



interface Request {
    _id: string;
    profilePicture: string;
    applicantName: string;
    businessName: string;
    emailAddress: string;
    phoneNumber: string;
    secondPhoneNumber: string;
    services: string;
    upiIdOrPhoneNumber: string;
    description: string;
    certificateExpirationDate: string;
    requestedDate: Date;
    licence: [];
}

const ListRequest: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [list, setList] = useState<Request[]>([]);
    const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
    const [requestIdToReject, setRequestIdToReject] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requests = await fetchRequest();
                setList(requests);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };
        fetchData();
    }, []);
    console.log(list);

    const handleCardClick = (request: Request) => {
        setSelectedRequest(request);
        document.getElementById('modal')?.classList.remove('hidden');
    };

    const closeModal = () => {
        setSelectedRequest(null);
        document.getElementById('modal')?.classList.add('hidden');
    };

    const handleImageClick = (url: string) => {
        setFullScreenImage(url);
    };

    const closeFullScreenImage = () => {
        setFullScreenImage(null);
    };

    const accept = async (event: React.MouseEvent, id: string) => {
        event.stopPropagation();
        try {
            const updatedList = list.filter(item => item._id !== id);
            setList(updatedList);
            const response = await acceptVendor(id);
            if (response) {
                toast.success('ACCEPTED');
            } else {
                toast.error('Failed to accept');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleReject = (id: string) => {
        setRequestIdToReject(id);
        setOpen(true);
    };

    const submitReject = async (text: string) => {
        if (!requestIdToReject) return;

        try {

            const updatedList = list.filter(item => item._id !== requestIdToReject);
            setList(updatedList);
            const response = await rejectVendor(requestIdToReject, text);
            if (response) {
                toast.success('REJECTED');
            } else {
                toast.error('Failed to reject');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setRequestIdToReject(null);
        }
    };

    return (
        <div>
            {open && (
                <ReasonModal
                    submit={submitReject}
                    open={open}
                    setOpen={setOpen}
                />
            )}
            <Toaster position="top-center" reverseOrder={false} />

            <div className="grid grid-cols-1X sm:grid-cols-2  lg:grid-cols-3 gap-4 p-4">
                {list.map((request) => (
                    <div
                        key={request._id}
                        className="card  p-4 rounded-lg shadow-md bg-[#292F45] cursor-pointer hover:shadow-lg"
                        onClick={() => handleCardClick(request)}
                    >
                        <img src={request.profilePicture} className="h-24 w-24 rounded-full mx-auto" alt="Profile" />
                        <h3 className="text-center text-lg font-semibold mt-2">{request.applicantName}</h3>
                        <p className="text-center text-gray-600">{request.businessName}</p>

                        <div className="flex justify-around mt-4 border-t pt-2">
                            <a className="flex items-center text-green-500" onClick={(event) => accept(event, request._id)}>ACCEPT</a>
                            <a className="flex items-center text-red-600" onClick={(event) => {
                                event.stopPropagation();
                                handleReject(request._id);
                            }}>REJECT</a>
                        </div>
                    </div> 
                ))}
            </div> 

            {selectedRequest && (
                <div id="modal" className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
                    <div className="relative p-8 bg-[#353C56] w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
                        <div className="lg:items-center">
                            <div className="flex lg:items-center justify-center space-x-4">
                                {selectedRequest.licence.map((item, index) => (
                                    <img
                                        key={index}
                                        className="h-10 w-10 object-cover rounded-lg cursor-pointer"
                                        src={item}
                                        alt={`Licence ${index + 1}`}
                                        onClick={() => handleImageClick(item)}
                                    />
                                ))}
                            </div>
                            <div className="mt-4 lg:mt-2 lg:ml-8 lg:flex-grow space-y-2">
                                <h3 className="text-lg font-semibold text-white">Applicant Name: {selectedRequest.applicantName}</h3>
                                <p className="text-gray-400">Business Name: <span className="text-white">{selectedRequest.businessName}</span></p>
                                <p className="text-gray-400">Email: <span className="text-white">{selectedRequest.emailAddress}</span></p>
                                <p className="text-gray-400">Phone Number: <span className="text-white">{selectedRequest.phoneNumber}</span></p>
                                <p className="text-gray-400">Second Phone Number: <span className="text-white">{selectedRequest.secondPhoneNumber}</span></p>
                                <p className="text-gray-400">Services: <span className="text-white">{selectedRequest.services}</span></p>
                                <p className="text-gray-400">UPI ID or Phone Number: <span className="text-white">{selectedRequest.upiIdOrPhoneNumber}</span></p>
                                <p className="text-gray-400">Description: <span className="text-white">{selectedRequest.description}</span></p>
                                <p className="text-gray-400">Certificate Expiration Date: <span className="text-white">{selectedRequest.certificateExpirationDate}</span></p>
                                <p className="text-gray-400">Requested Date: <span className="text-white">{new Date(selectedRequest.requestedDate).toLocaleDateString()}</span></p>
                            </div>

                        </div>

                        {fullScreenImage && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={closeFullScreenImage}>
                                <img src={fullScreenImage} alt="Full Screen" className="max-h-full max-w-full" />
                            </div>
                        )}

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={closeModal}
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListRequest;
