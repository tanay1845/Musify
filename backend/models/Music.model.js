import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    artistName:{
        type:String
    },
    playList:{
        type:String
    },
    thumbnail:{
        type:String
    }
},{timestamps:true})

export const Music = mongoose.model("Music",musicSchema)