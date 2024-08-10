import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IoMdPaperPlane } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { useAppSelector } from '../../costumeHooks/costum';
import { fetchComments, postComment, replySubmit, updateCommentLike, updateReplyLike } from '../../API/services/user/Services';

interface VendorInfo {
    vendorName: string;
    profilePicture: string;
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

interface Comment {
    _id: string;
    userId: {
        userName: string;
        profilePicture: string;
    };
    comment: string;
    likes: string[];
    replies: Reply[];
}

interface Reply {
    _id: string;
    comment: string;
    likes: string[];
}

interface PostModalProps {
    open: boolean;
    onClose: () => void;
    post: Post | null;
}

const BootstrapDialog = styled(Dialog)(({ }) => ({
    '& .MuiPaper-root': {
        maxWidth: '650px',
        maxHeight: '650px',
    },
}));

const PostModal: React.FC<PostModalProps> = ({ open, onClose, post }) => {
    const { _id } = useAppSelector((state) => state.user.userDetails);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState<string>('');
    const [likedComment, setLikedComment] = useState<string[]>([]);
    const [likedReply, setLikedReply] = useState<string[]>([]);
    useEffect(() => {
        if (post?._id) {
            fetchComments(post._id)
                .then((data) => {
                    setComments(data);
                    const initialLikedComment = data
                        .filter((comment: Comment) => Array.isArray(comment.likes) && comment.likes.includes(_id + ""))
                        .map((comment: Comment) => comment._id);
                    setLikedComment(initialLikedComment);

                    const initialLikedReply = data
                        .flatMap((comment: Comment) => Array.isArray(comment.replies) ? comment.replies : [])
                        .filter((reply: Reply) => Array.isArray(reply.likes) && reply.likes.includes(_id + ""))
                        .map((reply: Reply) => reply._id);
                    setLikedReply(initialLikedReply);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [post?._id, newComment, replyText, likedReply, likedComment]);
    const handleCommentSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (newComment.trim()) {
            try {
                await postComment(post?._id + "", newComment, _id + '');
                setNewComment('');
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        }
    };

    const handleReplyClick = (commentId: string) => {
        setReplyingTo((prev) => (prev === commentId ? null : commentId));
    };

    const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReplyText(event.target.value);
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('New Comment Value:', event.target.value);
        setNewComment(event.target.value);
    };

    const handleReplySubmit = async (commentId: string, event: React.FormEvent) => {
        event.preventDefault();
        try {
            await replySubmit(commentId, replyText);
            setReplyText('');
            setReplyingTo(null);
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };
    const commentLike = async (commentId: string) => {
        try {
            await updateCommentLike(commentId, _id + "");
            setLikedComment((prevLikedComment) =>
                prevLikedComment.includes(commentId)
                    ? prevLikedComment.filter((id) => id !== commentId)
                    : [...prevLikedComment, commentId]
            );
        } catch (error) {
            console.log(error);
        }
    };
    const replyLike = async (replyId: string) => {
        try {
            await updateReplyLike(replyId, _id + "");
            setLikedReply((prevLikedReply) =>
                prevLikedReply.includes(replyId)
                    ? prevLikedReply.filter((id) => id !== replyId)
                    : [...prevLikedReply, replyId]
            );
        } catch (error) {
            console.log(error);
        }
    };

    if (!post) {
        return null;
    }
    const addEmoji = (emoji: any) => {
        if (emoji && emoji.emoji) {
            setNewComment(prevComment => prevComment + emoji.emoji);
        } else {
            console.error('Emoji object is missing the emoji property.');
        }
    };



    return (
        <BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                <Box display="flex" justifyContent="space-between">
                    <Box flex={1}>
                        <Typography variant="h5" className="font-semibold" color="text.primary" gutterBottom>
                            {post.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                            {post.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <img className="w-10 h-10 rounded-full mr-2" src={post.vendorInfo.profilePicture} alt="Vendor" />
                        <Typography variant="h6" color="text.primary">
                            {post.vendorInfo.vendorName}
                        </Typography>
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                <Box display="flex" width="100%">
                    <Box flex={1} display="flex" flexDirection="column" mr={2}>
                        <Box mb={2}>
                            <img className="w-full h-[350px] object-cover" src={post.images[0]} alt="Post" />
                        </Box>
                    </Box>
                    <Box flex={1} display="flex" flexDirection="column" >
                        <Box
                            flex={1}
                            overflow="auto"
                            mb={2}
                            className="scrollnodiv"
                            sx={{
                                maxHeight: '300px',
                                overflowY: 'auto',
                                pr: 2,
                                '&::-webkit-scrollbar': {
                                    width: 0,
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >                            {comments.length > 0 ? (
                            comments.map((comment) => (
                                <Box key={comment._id} mb={2}>
                                    <Box display="flex" alignItems="center" mb={1}>
                                        <div className='flex justify-between w-full p-2'>
                                            <div className='flex items-start'>
                                                <img
                                                    className="w-8 h-8 rounded-full mr-2"
                                                    src={comment.userId.profilePicture}
                                                    alt={comment.userId.userName}
                                                />
                                                <div>
                                                    <Typography variant="body2" color="text.primary" className='font-semibold'>
                                                        {comment.userId.userName}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {comment.comment}
                                                    </Typography>
                                                </div>
                                            </div>

                                            <div className='flex items-center space-x-2'>
                                                <IconButton
                                                    aria-label="add to favorites"
                                                    sx={{ padding: '2px' }}
                                                    onClick={() => commentLike(comment._id)}
                                                >
                                                    <FavoriteIcon fontSize="small" color={likedComment.includes(comment._id) ? "error" : "inherit"} />
                                                </IconButton>

                                                <a
                                                    className="text-sm text-blue-500 hover:underline"
                                                    onClick={() => handleReplyClick(comment._id)}
                                                >
                                                    Reply
                                                </a>
                                            </div>
                                        </div>
                                    </Box>

                                    {comment.replies.map((reply) => (
                                        <Box key={reply._id} ml={4} mb={2} display="flex" alignItems="center">
                                            <div className='flex justify-between w-full p-2'>
                                                <div className='flex items-start'>
                                                    <img
                                                        className="w-6 h-6 rounded-full mr-2"
                                                        src={comment.userId.profilePicture}
                                                        alt={comment.userId.userName}
                                                    />
                                                    <div>
                                                        <Typography variant="body2" color="text.primary" className='font-semibold'>
                                                            {comment.userId.userName}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {reply.comment}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <div className='flex items-center space-x-2'>
                                                    <IconButton
                                                        aria-label="add to favorites"
                                                        sx={{ padding: '2px' }}
                                                        onClick={() => replyLike(reply._id)}
                                                    >
                                                        <FavoriteIcon fontSize="small" color={likedReply.includes(reply._id) ? "error" : "inherit"} />
                                                    </IconButton>

                                                    <a
                                                        className="text-sm text-blue-500 hover:underline"
                                                        onClick={() => handleReplyClick(comment._id)}
                                                    >
                                                        Reply
                                                    </a>
                                                </div>
                                            </div>
                                        </Box>
                                    ))}

                                    <div className={`overflow-hidden transition-all duration-500 ${replyingTo === comment._id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <form onSubmit={(e) => handleReplySubmit(comment._id, e)} className="w-full mt-2 pl-10">
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input
                                                    type="text"
                                                    name="reply"
                                                    id={`reply_${comment._id}`}
                                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                    value={replyText}
                                                    onChange={handleReplyChange}
                                                    required
                                                />
                                                <label htmlFor={`reply_${comment._id}`} className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                    Reply
                                                </label>
                                            </div>
                                            <Button type="submit" variant="contained" color="primary">
                                                Submit
                                            </Button>
                                        </form>
                                    </div>
                                </Box>
                            ))
                        ) : (
                            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                <Typography variant="h5" color="text.secondary">
                                    NO COMMENTS
                                </Typography>
                            </Box>
                        )}
                        </Box>
                        <Box mt="auto">
                            <form onSubmit={handleCommentSubmit} className="flex mb-4 items-center">
                                <Button
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    sx={{ mr: 1, padding: 1 }}
                                >
                                    <BsFillEmojiSmileFill />

                                </Button>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    placeholder="Add a comment"
                                    value={newComment}
                                    onChange={handleCommentChange}
                                    InputProps={{
                                        sx: {
                                            height: '30px',
                                            padding: 0,
                                        },
                                    }}
                                />
                                <Button type="submit" variant="contained" color="primary" sx={{ ml: 1, padding: 1 }}>
                                    <IoMdPaperPlane />

                                </Button>
                            </form>
                            {showEmojiPicker && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: '70px',
                                        left: 0,
                                        zIndex: 9999,
                                    }}
                                >
                                    <EmojiPicker onEmojiClick={(emoji) => addEmoji(emoji)} />
                                </Box>
                            )}
                        </Box>
                    </Box>

                </Box>
            </DialogContent>
        </BootstrapDialog>
    );
};

export default PostModal;
