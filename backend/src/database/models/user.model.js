import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required: true,
            unique: true,
            lowercase: true,
            match: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            maxlength: 254,
        },
        username:{
            type:String,
            required: true,
            unique: true,
            lowercase: true,
            match: /^[a-zA-Z0-9][a-zA-Z0-9._@-]{2,19}$/,
        },
        fullName:{
            type:String,
            required:true,
            minlength: 2,
            maxlength: 100,
        },
        password:{
            type:String,
            required:true,
            minlength:6,
        },
        profilePic:{
            type:String,
            default:"",
        },
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
    },
    {timestamps:true}
);
const User = mongoose.model("User",userSchema);
export default User;