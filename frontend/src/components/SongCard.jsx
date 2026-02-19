export default function SongCard({ thumbnail, title, artist, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer bg-slate-800 text-white rounded-xl shadow-lg
        transition-all duration-300 active:scale-95 


        flex items-center gap-3 p-3 w-[92vw] h-auto

        md:block md:w-60 md:p-0
        hover:md:scale-105 hover:md:shadow-2xl
      "
    >
      {/* Thumbnail */}
      <div
        className="
          flex-shrink-0 overflow-hidden rounded-lg
          w-12 h-12 group

          md:w-full md:h-40 md:rounded-t-xl
        "
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* <div>
          <img src="/play-button.png" alt="play" 
            className="invert-100 relative w-8 h-8 bottom-10 left-[80%] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div> */}
      </div>

      {/* Text */}
      <div className="flex-1 md:p-3 p-0">
        <h3 className="text-sm md:text-base overflow-x-hidden w-[70vw] md:w-55 font-semibold truncate">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-gray-400 truncate">
          {artist}
        </p>
      </div>
      
    </div>
  );
}
