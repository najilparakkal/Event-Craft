import React, { useEffect, useState } from 'react'
import { useSocket } from '../../API/services/outer/SocketProvider';
import { useAppSelector } from '../../costumeHooks/costum';
import { fetchUserRoomIds, fetchVendorNotification } from '../../API/services/user/Services';
import toast from 'react-hot-toast';
const Notification = () => {
    const { socket } = useSocket();
    const [idees, setIdees] = useState<string[]>([]);
    const { _id } = useAppSelector((state) => state.user.userDetails)
    useEffect(() => {
        fetchUserRoomIds(_id + "")
            .then((data) => {
                setIdees(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [_id]);
    useEffect(() => {

        if (socket && idees.length > 0) {
            socket.emit('join_home', idees);
            socket.on('new message', (data: any) => {
                if (data.senderModel === "Vendor") {
                    if (window.location.pathname !== '/messages') {
                        fetchVendorNotification(data.sender).then((notificationData) => {
                            toast.custom((t) => (
                                <div
                                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                                >
                                    <div className="flex-1 w-0 p-4">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 pt-0.5">
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={notificationData.profilePicture || "https://via.placeholder.com/40"}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {notificationData.userName || "Vendor"}
                                                </p>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {data.content || "You have a new message!"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex border-l border-gray-200">
                                        <button
                                            onClick={() => toast.dismiss(t.id)}
                                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            ));
                        }).catch((err) => {
                            console.log(err);
                        });
                    } else {
                        alert("You are already in the messages section");
                    }
                }
            });
            return () => {
                socket.off('new message');
            };
        }
    }, [socket, idees]);
    return (
        <>

        </>
    )
}

export default Notification
