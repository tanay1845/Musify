import mongoose, { Schema } from "mongoose";
// import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:String,
        default:false
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Music"
        }
    ]
}
,{timestamps:true})


userSchema.methods.generateAccessToken = async function() {
    try {
        // console.log(this._id)
        const token = jwt.sign({
            _id:this._id,
            email:this.email
        },
        process.env.JWT_SECRET_KEY,
        {
            algorithm:"HS256",
            expiresIn:process.env.EXPIRES_IN || 24*60*60*5
        })
        return token
    } catch (error) {
       console.log(error) 
    }
}

export const User = mongoose.model("User",userSchema);