import React, { useState } from 'react';
import { IoTrash, IoHeart, IoChatbubbleEllipses } from "react-icons/io5";
import PostModal from '../../../../compounents/vendor/PostModal';
import toast from 'react-hot-toast';
import { deletePost } from '../../../../API/services/vendor/services';
import { Post } from './Profile';

// interface IPost {
//     _id: string;
//     title: string;
//     images: string[];
//     description: string;
//     likesCount?: number;
//     commentsCount?: number;
//     category?: string;  
//     createdAt?: string; 
//     likes?: string[];  
//     vendorId?:string;
//     is_blocked?: boolean;
//    }

interface PostProps {
    post: Post;
}

const PostComponent: React.FC<PostProps> = ({ post }) => {
    const [isComponentVisible, setComponentVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

    const handleDeleteConfirmation = async () => {
        const update = await deletePost(post._id);
        if (update) {
            toast.success("Post deleted successfully");
        } else {
            toast.error("Failed to delete post");
        }
        setDeleteModalVisible(false); // Close the modal after deletion
    };

    const handleDeleteClick = () => {
        setDeleteModalVisible(true); // Show the delete confirmation modal
    };

    const handleImageClick = () => {
        setComponentVisible(true);
    };

    const closeComponent = () => {
        setComponentVisible(false);
    };

    return (
        <div className="bg-white border rounded-sm relative p-2 md:p-4">
            <img
                src={post.images[0]}
                alt="Post"
                className="w-full h-32 sm:h-48 object-cover rounded-sm cursor-pointer"
                onClick={handleImageClick}
            />
            <div className="pt-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-md sm:text-lg font-semibold">{post.title}</h2>
                    <div className="flex space-x-4">
                        <button className="flex items-center space-x-1 focus:outline-none">
                            <IoHeart className="text-lg sm:text-xl" />
                            <span className="text-sm sm:text-base">{post.likesCount}</span>
                        </button>
                        <button className="flex items-center space-x-1 focus:outline-none">
                            <IoChatbubbleEllipses className="text-lg sm:text-xl" />
                            <span className="text-sm sm:text-base">{post.commentsCount}</span>
                        </button>
                        <button onClick={handleDeleteClick} className="focus:outline-none">
                            <IoTrash className="text-lg sm:text-xl" />
                        </button>
                    </div>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">{post.description}</p>
            </div>
            {isComponentVisible && (
                <PostModal open={isComponentVisible} onClose={closeComponent} post={post} />
            )}
            {isDeleteModalVisible && (
                <div id="popup-modal" tabIndex={-1} className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md">
                        <div className="relative bg-white rounded-lg shadow ">
                            <button type="button" onClick={() => setDeleteModalVisible(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 1" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 className="mb-5 text-lg  font-bold dark:text-gray-400">Are you sure you want to delete this post?</h3>
                                <button onClick={handleDeleteConfirmation} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Yes, I'm sure
                                </button>
                                <button onClick={() => setDeleteModalVisible(false)} className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(PostComponent);
