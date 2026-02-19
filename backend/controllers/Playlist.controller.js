import { MyPlayList } from "../models/MyPlayList.model.js";
import { PlayList } from "../models/Playlist.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const DEFAULT_THUMBNAIL = "https://res.cloudinary.com/dfxswq5lf/image/upload/v1770709780/Music_Red_App_Icon_uwrna7.jpg"


export const makeNewPlaylist  = async(req,res) => {
    try {
        const { playListName } = req.body

        if(!playListName){
            return res.status(400).json({
                message: "Playlist list name is required",
                success: false,
            }); 
        }

        const isPlayListNameFound = await PlayList.findOne({playListName})
        if(isPlayListNameFound){
            return res.status(400).json({
                message: "Playlist list name is already there",
                success: false,
            }); 
        }

        let thumbnailUrl = DEFAULT_THUMBNAIL
        
        const playlistThumbnail_Local_path = req.file?.path;
        // console.log(playlistThumbnail)
        if(playlistThumbnail_Local_path){
            const thumbnail = await uploadOnCloudinary(playlistThumbnail_Local_path,"image")
            if(thumbnail){
                thumbnailUrl = thumbnail.secure_url
            }
        }

        const playlist = await PlayList.create({
            playListName,
            playlistThumbnail:thumbnailUrl
        })

        return res.status(200).json({
            message:"New Playlist created successfully.",
            playlist
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error while making new playlist",
            success: false,
            error
        });
    }
}

export const fetchPlayList = async(req,res) => {
    try {
        const playlist = await PlayList.find()
        if(!playlist){
            return res.status(400).json({
            message: "playlist not found",
            success: false,
            });
        }

        return res.status(200).json({
            message:"Playlist fetched successfully",
            success:true,
            playlist
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error while fetching playlist",
            success: false,
            error
        });
    }
}

export const createMyPlayList = async(req,res) => {
    try {
        const  {myPlayListName}  = req.body
        if(!myPlayListName){
            return res.status(404).json({
                message:"playlist name is not found",
                success:false
            })
        }
        const owner = req.user._id
        const myPlayList = await MyPlayList.create({
            myPlayListName,
            owner
        })

        return res.status(200).json({
            message:"My playlist created successfully",
            success:true,
            myPlayList
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error while creating my playlist",
            success:false,
            error
        })
    }
}

export const addSongToPlayList = async(req,res) => {
    try {
        const {playListId, songId} = req.body

        const playlist = await MyPlayList.findOne({
            _id:playListId,
            owner:req.user._id
        })

        if(!playlist){
            return res.status(400).json({
                message:"playlist not found",
                success:false
            })
        }

        if(playlist.songs.includes(songId)){
            return res.status(400).json({
                message:"song is already exits",
                success:false
            })
        }

        playlist.songs.push(songId);
        await playlist.save();

        return res.status(200).json({
            message:"Song added successfully",
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error while adding song into my playlist",
            success:false,
            error
        }) 
    }
}


export const getMyPlayList = async(req,res) => {
    try {
        const userId = req.user?._id
        if(!userId){
            return res.status(404).json({
                message:"user not found at fetching my playlist",
                success:false
            })
        }
        const myPlayList = await MyPlayList.find({owner:userId})

        

        return res.status(200).json({
            message:"my playlist fetched successfully",
            myPlayList
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server error while fetching user playlist",
            success:false,
            error
        })
    }
}

export const removeSongFromPlaylist = async(req,res) => {
    try {
        const {removeSongId,playListId} = req.body
        const userId = req.user?._id
        
        if(!removeSongId || !playListId){
            return res.status(404).json({
                message:"songId or playListId not found for removing song from my playlist",
                success:false
            })
        }

        const updatedPlaylist = await MyPlayList.findOneAndUpdate(
            { _id:playListId,owner: userId },
            { $pull: {songs : removeSongId}},
            { new : true }
        ).populate("songs")

        if (!updatedPlaylist) {
            return res.status(404).json({
                message:"playlist does not exist",
                success:false
            })
        }

        return res.status(200).json({
            message:"Song removed successfully",
            success:true,
            updatedPlaylist
        })

    } catch (error) {
        return res.status(500).json({
            message:"Internal Server error for removing song from playlist",
            success:false,
            error
        })
    }
}

export const removePlayList = async (req,res) => {
    try {
        const {playListId} = req.body
        const userId = req.user._id

        if(!playListId){
            return res.status(404).json({
                message:"playlist does not exist",
                success:false
            })
        }

        const updatedPlaylist = await MyPlayList.findOneAndDelete(
            {
                _id:playListId,
                owner:userId
            }
        )

        if(!updatedPlaylist){
            return res.status(404).json({
                message: "Playlist not found or unauthorized",
                success: false
            });
        }

        return res.status(200).json({
            message: "Playlist deleted successfully",
            success: true,
            updatedPlaylist
        });
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server error for removing the playlist",
            success:false,
            error
        })
    }
}