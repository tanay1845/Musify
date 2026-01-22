export default function SongCard({ thumbnail, title, artist, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-60 h-50 bg-slate-800 text-white rounded-lg shadow-lg hover:shadow-2xl transition cursor-pointer hover:scale-105"
    >
      <div className="w-full h-35 overflow-hidden rounded-t-lg">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold truncate">{title}</h3>
        <p className="text-xs text-gray-400 truncate">{artist}</p>
      </div>
    </div>
  );
}