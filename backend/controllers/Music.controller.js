import { Music } from "../models/Music.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const DEFAULT_THUMBNAIL =
  "https://res.cloudinary.com/dfxswq5lf/image/upload/v1768725480/Music_gjk6xq.jpg";

export const storeMusic = async (req, res) => {
  try {
    const { title, artistName, playList } = req.body;

    const user = req.user.isAdmin
    // console.log(user)
    
    if(user == 'false'){
      return res.status(400).json({
        message: "Only admin users can upload the music",
        success: false,
      });
    }

    if (!title || !artistName) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const audioLocalPath = req.files?.audio?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;
    // console.log(req.files)

    if (!audioLocalPath) {
      return res.status(400).json({
        message: "Audio missing",
        success: false,
      });
    }

    const existingFile = await Music.findOne({ title });
    if (existingFile) {
      return res.status(400).json({
        message: "This music file already exists",
        success: false,
      });
    }

    // Upload audio (required)
    const audio = await uploadOnCloudinary(audioLocalPath, "video" , "audio");
    if (!audio) {
      return res.status(400).json({
        message: "Audio upload failed",
        success: false,
      });
    }

    // Upload thumbnail ONLY if provided
    let thumbnailUrl = DEFAULT_THUMBNAIL;

    if (thumbnailLocalPath) {
      const thumbnail = await uploadOnCloudinary(thumbnailLocalPath, "image" ,"images");
      if (thumbnail) {
        thumbnailUrl = thumbnail.secure_url;
      }
    }

    const music = await Music.create({
      title,
      artistName,
      playList,
      url: audio.secure_url,
      thumbnail: thumbnailUrl,
    });

    return res.status(201).json({
      message: "Music stored successfully",
      success: true,
      music,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error while storing the music files",
      error: error.message
    });
  }
};





export const fetchMusic = async (req, res) => {
  try {
    const music = await Music.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: music.length
        ? "Music fetched successfully"
        : "No music found",
      count: music.length,
      music,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching music files",
      error: error.message,
    });
  }
};


export const fetchPlaylist = async(req,res) => {
  try {
    const {playlist} = req.body

    const music = await Music.find({playList: playlist})
    if(!music){
      return res.status(400).json({
        success: false,
        message:"playlist not found"
      });
    }
   
    return res.status(200).json({
      success: true,
      message:"playlist fetched successfully",
      music
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching music files in playlist",
      error: error.message,
    });
  }
}