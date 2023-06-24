import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true, 
        minlength: 7,
        trim: true
    },
    img:{
        type:String,
    },
    subscribers:{
        type:Number,
        default:0,
    },
    subscribedUsers:{
        type:[String]
    }
},{timestamps:true,
versionKey: false}
)

export default mongoose.model("User", UserSchema,"User");

