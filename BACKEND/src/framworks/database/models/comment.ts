import mongoose, { Schema, Document } from "mongoose";

export interface IReply extends Document {
  commentId: string;
  comment: string;
  likes: string[];
}

export interface IComment extends Document {
  comment: string;
  userId: string;
  postId: string;
  replies: string[];
  likes: string[];
}

const replySchema: Schema<IReply> = new Schema(
  {
    commentId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const commentSchema: Schema<IComment> = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      ref: "Users",
      required: true,
    },
    postId: {
      type: String,
      ref: "Posts",
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    },
    replies: [
      {
        type: String,
        ref: "Reply",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Reply = mongoose.model<IReply>("Reply", replySchema);
const Comment = mongoose.model<IComment>("Comment", commentSchema);

export { Reply, Comment };
