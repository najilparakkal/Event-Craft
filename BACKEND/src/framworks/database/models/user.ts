import mongoose, { Schema, model, Document } from "mongoose";
import { IBooking } from "./booking";

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  phoneNum: string;
  verified: boolean;
  otp: string;
  registered: Date;
  blocked: boolean;
  profilePicture: string;
  chats: string;
  wallet: number;
  refreshToken:string
}

const userSchema = new Schema<IUser>({
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    minlength: 6,
  },
  phoneNum: {
    type: String,
    default: "not provided",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  profilePicture: {
    type: String,
    default:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAmgMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAABQYHBAEC/8QANhAAAgIBAgMECAUDBQAAAAAAAAECAwQFEQYSITFRgdETIkFCYXGhsRQyUpHBYrLhIyRTY5L/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/ANSABpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArPFWvyxW8LBntc1/q2L3F3L4gSuo65gac+S+7mt/4odZePcQ8uNaOb1cG1xXtdiRTm2223u31b7zwuGtAweKNOy5KE5Sx5y7Fauj8UTa6rddV8DJCf4b1+zBtjjZU3LEk+19tT718AL4DxPdbrqn1Wx6QAAAAAAAAAAAAAAAAc2pZawcC/KfX0cd0n7X7PqZfZZK2yVlknKc3zSl3v2l543m46NGC9+6KfyW7+6KIUoACoAAlWL7wfnPL0z0M5bzx3y7/ANPu+XgTxSOBJuOpXwXZOnf9pLzLuQAAAAAAAAAAAAAAAAQHGsObRVJe5dFvx3X3ZQzUdVxfx2nZGN03sg1Hfv7V9djL5xlCcoTTjKLakn7GUeAAqAAJVizcCQb1DJs26RpS8W/8MupAcF4UsbTJXzW0siXMt+3lXZ/JPkAAAAAAAAAAAAAAAAAq/E3Ds8qyWbgQTtfW2rs5/ivj9y0ADJrIyrm4Ti4zT2cWtmvA+TVMrDxcuPLlY1Vy/wSyCbXicL4d0lvf8HBfKT8wM5+fgT+g8OXZtkb8yt1Yqe+z6Ss+CXd8S4Yulafiy5sfDphL9XIm/wB2dgV5GMYxUYxUYpJJJdiPQAgAAAAAAAAAAAAAAEZres0aTV6/r3yXqVJ/V9yA77rqqK3ZfONdce2UnskV/P4vxKW44dU75L3n6sfNlT1HUcrUrvSZVjkl+WC/LH5I5Aanb+LNTtb9G6aV/RXu/wB3ucz4h1Zvf8bP/wAx8iLBcRM1cUatW95XwsXdZWn9tiWwuMotqOdiuPfOnd/RlQAwalhZ+LnV8+JdGxLtS6NfNdqOkyii63HtVtFkq7I9kovZl10DiSGa442dtXkPpGfZGzyYVYgAQAAAAAAAAAABH61qlelYbuns7JdKofql5IznJyLcq+d183Oyb3bO7iLUXqWpTnFv0Fb5Kk+7v8e0jAAAKgACgAAA7AALzwprbza/weVLfJrXqyfvx80WIyjHvsxciu+l8tlb5kzT8DKhm4dWTX0jZHfbuftXgzKugAAAAAAAAi+Jct4ejZFkHtZNKuHzb8tyUKrx5a1j4lP6pyk/jt0/kCnAAsQABQAAAAAAAALhwLluVWThzf5GrIfJ9H9dv3KeTfB9vo9crj7LISjt4b/wRWgAAgAAAAABTuPX/uMNezkn90ABVQAajIAAoAAAAAAAASfDL217D2/W/wC1gCjSAAZUAAH/2Q==",
  },
  wallet: {
    type: Number,
    default: 0,
  },
  otp: {
    type: String,
  },
  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: "ChatModel",
    },
  ],
  refreshToken:{
    type:String
  },
  registered: {
    type: Date,
    default: Date.now,
  },
});

export const Users = model<IUser>("Users", userSchema);
