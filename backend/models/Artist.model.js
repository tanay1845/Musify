import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    artistName:{
        type:String,
        required:true
    },
    artistImage:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Artist = mongoose.model("Artist", artistSchema)