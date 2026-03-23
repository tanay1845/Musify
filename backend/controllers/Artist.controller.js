import {Artist} from "../models/Artist.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

export const addArtist = async (req, res) => {
  try {
    const { artistName } = req.body;
    
    if (!artistName) {
        return res.status(400).json({
            message: "Artist name is required",
            success: false
        });
    }
    
    const artist = await Artist.findOne({ artistName });
    if (artist) {
      return res.status(400).json({
        message: "Artist already exists",
        success: false
      });
    }

    const user = req.user;

    if (!user.isAdmin) {
      return res.status(403).json({
        message: "Only Admin can perform this action",
        success: false
      });
    }

    const artistLocalPath = req.file?.path;

    if (!artistLocalPath) {
      return res.status(400).json({
        message: "Artist image missing",
        success: false
      });
    }

    const image = await uploadOnCloudinary(
      artistLocalPath,
      "image",
      "images"
    );

    const artistInfo = await Artist.create({
      artistName,
      artistImage: image.url
    });

    return res.status(201).json({
      message: "Artist created successfully",
      success: true,
      artistInfo
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error while adding artist",
      error: error.message
    });
  }
};