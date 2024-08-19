import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { fetchPostData } from '../../API/services/vendor/services';

interface Post {
    _id: string;
    title: string;
    description: string;
    images: string[];
    category?: string | undefined; 
    createdAt?: string;
    likes?: string[];  
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
    post: Post;
}

const BootstrapDialog = styled(Dialog)(({ }) => ({
    '& .MuiPaper-root': {
        maxWidth: '650px',
        maxHeight: '650px',
    },
}));

const PostModal: React.FC<PostModalProps> = ({ open, onClose, post }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    
    useEffect(() => {
        if (post?._id) {
            fetchPostData(post._id).then((data) => {
                setComments(data);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [post]);

    if (!post) {
        return null;
    }

    return (
        <BootstrapDialog onClose={onClose} open={open} aria-labelledby="post-modal-title">
            <DialogContent dividers>
                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} width="100%">
                    <Box flex={1} display="flex" flexDirection="column" mr={2}>
                        <Box mb={2}>
                            <img className="w-full h-[200px] sm:h-[350px] object-cover" src={post.images[0]} alt="Post" />
                        </Box>
                    </Box>
                    <Box flex={1} display="flex" flexDirection="column">
                        <Box
                            flex={1}
                            overflow="auto"
                            mb={2}
                            sx={{
                                maxHeight: '350px',
                                overflowY: 'auto',
                                pr: 2,
                                '&::-webkit-scrollbar': {
                                    width: 0,
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <Box key={comment._id} mb={2}>
                                        <Box display="flex" alignItems="flex-start" mb={1}>
                                            <Avatar
                                                src={comment.userId.profilePicture}
                                                alt={comment.userId.userName}
                                                sx={{ width: 32, height: 32 }}
                                            />
                                            <Box ml={2}>
                                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                    {comment.userId.userName}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mt: 0.5 }}>
                                                    {comment.comment}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        {comment.replies.length > 0 && (
                                            <Box ml={6}>
                                                {comment.replies.map((reply) => (
                                                    <Box key={reply._id} display="flex" alignItems="flex-start" mb={1}>
                                                        <Avatar
                                                            src={comment.userId.profilePicture}
                                                            alt={comment.userId.userName}
                                                            sx={{ width: 24, height: 24 }}
                                                        />
                                                        <Box ml={2}>
                                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                                Reply
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                                                                {reply.comment}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}
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
                    </Box>
                </Box>
            </DialogContent>
        </BootstrapDialog>
    );
};

export default PostModal;
