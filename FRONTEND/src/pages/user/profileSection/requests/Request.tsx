import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../costumeHooks/costum';
import { cancelRequest, fetchRequest } from '../../../../API/services/user/Services';
import toast, { Toaster } from 'react-hot-toast';

interface RequestItem {
  vendorId: string;
  vendorProfilePicture: string;
  vendorName: string;
  requested: string; 
}

const Request: React.FC = () => {
  const { _id } = useAppSelector((state) => state.user.userDetails);
  const [reqs, setReqs] = useState<RequestItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchRequest(_id + "");
        if (response) {
          setReqs(response);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    if (_id) {
      fetch();
    }
  }, [_id]);

  const cancel = (id: string) => {
    setSelectedRequestId(id);
    setIsModalVisible(true);
  };

  const confirmCancel = async () => {
    if (selectedRequestId !== null) {
      try {
        await cancelRequest(selectedRequestId, _id + "");
        toast.success("Cancelled successfully");
        setReqs(reqs.filter(req => req.vendorId !== selectedRequestId));
      } catch (error) {
        toast.error("Failed to cancel request");
      } finally {
        setIsModalVisible(false);
      }
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedRequestId(null);
  };

  return (
    <div className="p-4">
      <Toaster position="top-center" reverseOrder={false} />

      {reqs.length === 0 ? (
        <div className="text-center text-gray-500">NO REQUESTS FOUND</div>
      ) : (
        reqs.map((req, index) => (
          <div key={index} className="flex items-center bg-gray-400 rounded-md p-2 mb-2 space-x-4">
            <img
              src={req.vendorProfilePicture}
              alt="vendor profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-grow text-white">
              {req.vendorName}
            </div>
            <div className="text-white">
              requested on: {new Date(req.requested).toLocaleDateString()}
            </div>
            <button className="text-red-600 ml-auto" onClick={() => cancel(req.vendorId)}>cancel</button>
          </div>
        ))
      )}

      <div
        id="popup-modal"
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isModalVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ transition: 'opacity 0.2s ease-in-out' }}
      >
        <div className={`relative bg-white rounded-lg shadow dark:bg-gray-700 p-4 md:p-5 transition-transform duration-300 transform ${isModalVisible ? 'scale-100' : 'scale-95'}`}>
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={closeModal}
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="text-center">
            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you need to cancel the request?</h3>
            <button
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              onClick={confirmCancel}
            >
              Yes, I'm sure
            </button>
            <button
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={closeModal}
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Request);
