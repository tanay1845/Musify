import { Music } from "../models/Music.model.js"

export const storeMusic = async(req,res) => {
    try {
        const {title,url} =  req.body
        if (!title || !url){
          return res.status(400).json({
            message:"All fields are required",
            success:false,
            })  
        }

        const existingFile = await Music.findOne({title})

        if(existingFile){
            return res.status(400).json({
                message:"This music file is already there",
                success:false
            })
        }

        const music = await Music.create({
            title,
            url
        })

        return res.status(200).json({
            message:"Music file stored successfully",
            success:true,
            music
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error while storing the music files",
            error
        })
    }
}