import mongoose,{Schema,model,Document} from "mongoose";


export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
}


const userSchema = new Schema<IUser>({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/^\S+@\S+\.\S+$/,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    phone:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10,
        unique:true
    },
    verified:{
        type:Boolean,
        default:false
    }
});

export const Users = model<IUser>("Users",userSchema);