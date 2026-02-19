import mongoose from "mongoose";

const playListSchema = new mongoose.Schema({
    playListName:{
        type:String,
        required:true,
        unique:true
    },
    playlistThumbnail:{
        type:String
    },
},{timestamps:true})

export const PlayList = mongoose.model("PlayList",playListSchema);