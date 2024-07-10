"use strict";
// import mongoose from 'mongoose';
// const { Schema } = mongoose;
// const chatSessionSchema = new Schema({
//     participants: [{
//         type: Schema.Types.ObjectId,
//         refPath: 'participantModel',
//     }],
//     participantModel: {
//         type: [String],
//         required: true,
//         enum: ['Users', 'Vendors']
//     },
//     messages: [{
//         sender: {
//             type: Schema.Types.ObjectId,
//             refPath: 'senderModel',
//         },
//         senderModel: {
//             type: String,
//             required: true,
//             enum: ['Users', 'Vendors']
//         },
//         content: String,
//         createdAt: { type: Date, default: Date.now },
//     }],
//     createdAt: { type: Date, default: Date.now },
// });
// export const ChatSession = mongoose.model('ChatSession', chatSessionSchema);
