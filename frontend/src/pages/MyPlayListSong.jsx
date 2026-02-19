import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SongCard from '../components/SongCard'
import { useMusic } from '../context/MusicContext'

function MyPlayListSong() {

    const { setAllSong, setCurrentTrackIndex, setCurrentSong } = useMusic()

    const [myPlayListName, setMyPlayListName] = useState("")
    const [songs, setSongs] = useState([])
    const [showRemove, setShowRemove] = useState(false)
    const [showRemovePlayList, setShowRemovePlayList] = useState(false)
    const [removeSongId, setRemoveSongId] = useState("")

    const { id } = useParams()
    const navigate = useNavigate()




    const fetchSong = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/v2/music/get-song-myplaylist", { id }, { withCredentials: true })
            setMyPlayListName(res.data.myplaylist.myPlayListName)
            setSongs(res.data.myplaylist.songs)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSong()
    }, [showRemove])


    const handleSongClick = (index, songId, song) => {
        setAllSong(songs);
        setCurrentTrackIndex(index);
        setCurrentSong(song)
        navigate(`/music/${songId}`)
    };


    const handleRemoveShow = (songId) => {
        setShowRemove(true)
        setRemoveSongId(songId)
    }

    const handleCancel = () => {
        setShowRemove(false)
        setShowRemovePlayList(false)
    }

    const handleRemoveClick = async() => {
        try {
            const res = await axios.post("http://localhost:3000/api/v2/music/remove-song",
                {
                    removeSongId,
                    playListId: id
                },
                {
                    withCredentials:true
                })
            console.log(res)
            setShowRemove(false)
        } catch (error) {
            console.log(error)
            setShowRemove(false)
        }
    }

    const handleShowPlayListRemove = () => {
        setShowRemovePlayList(true)
    }

    const handleRemovePlaylistClick = async() => {
        try {
            const res = await axios.post("http://localhost:3000/api/v1/playlist/remove-playlist",
            {
                playListId : id
            },
            {withCredentials:true}
        )
        console.log(res)
        setShowRemovePlayList(false)
        navigate(-1)
        } catch (error) {
            console.log(error)
            setShowRemovePlayList(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-800">
            <div className='flex items-center justify-between'>
                <p className="text-white font-bold p-3 text-4xl">
                    {myPlayListName}
                </p>
                <div className='text-red-600 px-2 rounded-lg border-2 border-red-600 font-bold text-sm bg-white'>
                    <button className='flex flex-col cursor-pointer'
                        onClick={handleShowPlayListRemove}
                    >
                        <span>Remove</span> 
                        <span>Playlist</span>
                    </button>
                </div>

            </div>
            {
                showRemovePlayList && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

                        <div className="bg-slate-900 border border-red-500/40 shadow-2xl rounded-2xl w-[90%] max-w-md p-8 text-center animate-fadeIn">

                            <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-red-600/20 border border-red-500">
                                <span className="text-red-500 text-3xl font-bold">!</span>
                            </div>

                            <h2 className="text-white text-2xl font-bold mb-3">
                                Are you sure?
                            </h2>

                            <p className="text-gray-400 text-sm mb-6">
                                This Playlist will be permanently removed.
                            </p>

                            <div className="flex justify-center gap-4">

                                <button className="px-6 py-2 cursor-pointer rounded-full bg-gray-700 text-white hover:bg-gray-600 transition duration-300"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>

                                <button className="px-6 py-2 cursor-pointer rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-300 shadow-lg shadow-red-600/30"
                                    onClick={()=>handleRemovePlaylistClick()}
                                >
                                    Remove
                                </button>

                            </div>
                        </div>
                    </div>
                )
            }
            {
                showRemove && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

                        <div className="bg-slate-900 border border-red-500/40 shadow-2xl rounded-2xl w-[90%] max-w-md p-8 text-center animate-fadeIn">

                            <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-red-600/20 border border-red-500">
                                <span className="text-red-500 text-3xl font-bold">!</span>
                            </div>

                            <h2 className="text-white text-2xl font-bold mb-3">
                                Are you sure?
                            </h2>

                            <p className="text-gray-400 text-sm mb-6">
                                This song will be permanently removed from your playlist.
                            </p>

                            <div className="flex justify-center gap-4">

                                <button className="px-6 py-2 cursor-pointer rounded-full bg-gray-700 text-white hover:bg-gray-600 transition duration-300"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>

                                <button className="px-6 py-2 cursor-pointer rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-300 shadow-lg shadow-red-600/30"
                                    onClick={()=>handleRemoveClick()}
                                >
                                    Remove
                                </button>

                            </div>
                        </div>
                    </div>

                )
            }
            <div className="flex flex-wrap gap-6 p-5 pb-48 ">
                {songs.map((song, index) => (
                    <div
                        key={song._id}
                        className="relative w-fit group"
                    >
                        <SongCard
                            thumbnail={song.thumbnail}
                            title={song.title}
                            artist={song.artistName}
                            onClick={() => handleSongClick(index, song._id, song)}
                        />

                        <button
                            onClick={() => handleRemoveShow(song._id)}
                            className="absolute top-2 right-2 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                            <img src="/minus.png" alt="remove" className='w-7 h-7 cursor-pointer' />
                        </button>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default MyPlayListSong
