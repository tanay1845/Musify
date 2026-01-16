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
    }
}
,{timestamps:true})

// userSchema.pre("save",async function (next) {
//     if(!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next()
// })

// userSchema.method.isPasswordCorrect = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password)
// }

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
            expiresIn:process.env.EXPIRES_IN
        })
        return token
    } catch (error) {
       console.log(error) 
    }
}

export const User = mongoose.model("User",userSchema);