import mongoose, {Schema} from "mongoose";
import  jwt  from "jsonwebtoken";

const userSchema = new Schema({
    userId:{
        type:String,
        required: true,
        unique: true,
    },
    name:{
        type:String,
        trim: true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true,
    },
    passwordHash :{
        type: String,
        required: true,
    },
    age:{
       type: Number,
    },
    gender:{
        type:String,
        enum: ["male", "female", "other"],
        default: "other",
    },
    conditions: [String],
    medcations: [String],
    smoker: {
        type: Boolean,
        default: false,
    },
    riskSensitivity: {
        type: Number,
        default: 0.5,
    },
    refreshToken:{
        type: String,
    },
}
,
{timestamps: true}
);

export const User = mongoose.model("User", userSchema)