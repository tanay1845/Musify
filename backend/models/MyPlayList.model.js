import mongoose from "mongoose";

const myPlayListSchema = new mongoose.Schema({
    myPlayListName:{
        type:String,
        required:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    songs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Music"
        }
    ]
},{timestamps:true})

export const MyPlayList = mongoose.model("MyPlayList",myPlayListSchema);