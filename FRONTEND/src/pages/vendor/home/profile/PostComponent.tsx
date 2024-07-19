import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

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
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleArchive = (postId: string) => {
        console.log(`Archive post with ID: ${postId}`);
        // Add your archive logic here
    };

    const handleDelete = (postId: string) => {
        console.log(`Delete post with ID: ${postId}`);
        // Add your delete logic here
    };

    return (
        <div className="bg-white border rounded-sm relative">
            <img src={post.images[0]} alt="Post" className="w-full h-48 object-cover" />
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{post.title}</h2>
                    <div className="relative">
                        <button onClick={handleMenuToggle} className="focus:outline-none">
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg">
                                <button
                                    onClick={() => handleArchive(post._id)}
                                    className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
                                >
                                    Archive
                                </button>
                                <button
                                    onClick={() => handleDelete(post._id)}
                                    className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <p className="text-gray-600">{post.description}</p>
            </div>
        </div>
    );
};

export default PostComponent;
