import SongCard from './SongCard';

function StartListening({ music, onSongSelect }) {
  return (
    <div className="min-h-screen bg-slate-800">
      <p className="text-4xl text-white font-bold p-5">Songs</p>

      <div className="flex flex-wrap gap-6 p-5">
        {music.map((song, index) => (
          <SongCard
            key={song._id}
            thumbnail={song.thumbnail}
            title={song.title}
            artist={song.artistName}
            onClick={() => onSongSelect(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default StartListening;
