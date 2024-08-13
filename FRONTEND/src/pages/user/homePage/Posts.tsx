import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import { Typography } from '@mui/material';
import { fetchPosts, updateLike } from '../../../API/services/user/Services';
import PostModal from '../../../compounents/user/PostModal';
import { useNavigate } from 'react-router-dom';

interface VendorInfo {
    vendorName: string;
    profilePicture: string;
    _id:string
}

interface Post {
    _id: string;
    title: string;
    description: string;
    images: string[];
    vendorInfo: VendorInfo;
    category: string;
    createdAt: string;
    likes: string[];
}

interface PostProps {
    userId: string;
}



const Posts: React.FC<PostProps> = ({ userId }) => {
    const [datas, setDatas] = useState<Post[]>([]);
    const [likedPosts, setLikedPosts] = useState<string[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const navigate = useNavigate()
    useEffect(() => {
        fetchPosts(userId + "")
            .then((data) => {
                setDatas(data);
                const initialLikedPosts = data.filter((post: Post) => post.likes.includes(userId)).map((post: Post) => post._id);
                setLikedPosts(initialLikedPosts);
            })
            .catch((error: Error) => console.log(error));
    }, [userId]);
    const handleLike = async (postId: string) => {
        setLikedPosts(likedPosts.includes(postId) ? [...likedPosts].filter((item) => item !== postId) : [...likedPosts, postId]);
        await updateLike(postId, userId);
    };

    const handleCardClick = (post: Post) => {
        setSelectedPost(post);
    };

    const handleCloseModal = () => {
        setSelectedPost(null);
    };

    return (
        <div className='grid grid-cols-1 gap-4 p-12 rounded-full md:grid-cols-2 xl:grid-cols-4'>
            {datas.map((post) => (
                <Card
                    key={post._id}
                    className="max-w-xs mb-2 flex flex-col h-full bg-gray-800"
                >
                    <CardMedia
                        component="img"
                        className="flex-grow cursor-pointer"
                        image={post.images[0]}
                        alt={post.title}
                        onClick={() => handleCardClick(post)}
                    />
                    <CardActions className="flex justify-between p-2 bg-gray-800">
                        <IconButton
                            aria-label="add to favorites"
                            sx={{ padding: '8px' }}
                            onClick={(e) => { e.stopPropagation(); handleLike(post._id); }}
                        >
                            <FavoriteIcon fontSize="small" color={likedPosts.includes(post._id) ? "error" : "inherit"} />
                        </IconButton>
                        <IconButton
                            aria-label="comment"
                            className="p-2 hover:text-white"
                            onClick={(e) => { e.stopPropagation(); handleCardClick(post); }}
                        >
                            <CommentIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            aria-label="share"
                            className="p-2 hover:text-white"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ShareIcon fontSize="small" />
                        </IconButton>
                    </CardActions>
                    <CardContent className="flex justify-between p-2 bg-gray-800 mt-[-16px]">
                        <div>
                            <Typography variant="body2" className="text-gray-400 hover:text-white">
                                <strong className='text-white'>{post.title}</strong><br />
                                {post.description}<br />
                                Created on: {new Date(post.createdAt).toLocaleDateString()}
                            </Typography>
                        </div>
                        <div className="items-center">
                            <Typography variant="body2" className="font-bold text-white mr-2 ">
                                <strong>  {post.vendorInfo.vendorName}</strong>
                            </Typography>
                            <Avatar src={post.vendorInfo.profilePicture} aria-label="vendor" onClick={() => navigate(`/vendorProfile/${post.vendorInfo._id}`)}
                                className="w-5 h-5 mt-1 ml-auto  transition-transform duration-700 hover:scale-105" />
                        </div>
                    </CardContent>
                </Card>
            ))}
            {selectedPost && (
                <PostModal open={!!selectedPost} onClose={handleCloseModal} post={selectedPost} />
            )}
        </div>
    );
}

export default React.memo(Posts);
