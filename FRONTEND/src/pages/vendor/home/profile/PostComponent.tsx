import React from 'react';
import { IoTrash } from "react-icons/io5";

interface Post {
    _id: string;
    title: string;
    images: string[];
    description: string;
}

interface PostProps {
    post: Post;
}

const PostComponent: React.FC<PostProps> = ({ post }) => {
    const handleDelete = (postId: string) => {
        console.log(`Delete post with ID: ${postId}`);
    };

    return (
        <div className="bg-white border rounded-sm relative p-2 md:p-4">
            <img src={post.images[0]} alt="Post" className="w-full h-32 sm:h-48 object-cover rounded-sm" />
            <div className="pt-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-md sm:text-lg font-semibold">{post.title}</h2>
                    <div className="relative">
                        <button onClick={() => handleDelete(post._id)} className="focus:outline-none">
                            <IoTrash className="text-lg sm:text-xl" />
                        </button>
                    </div>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">{post.description}</p>
            </div>
        </div>
    );
};

export default React.memo(PostComponent);
