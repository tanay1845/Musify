export default function SongCard({ thumbnail, title, artist, onClick, isPlaying = false }) {



  return (
    <div
      onClick={onClick}
      className="
        group cursor-pointer
        bg-slate-800/50 backdrop-blur-sm
        text-white rounded-xl
        transition-all duration-300 
        hover:bg-slate-700/50
        hover:shadow-2xl hover:shadow-indigo-500/20
        active:scale-98
        
        /* Mobile styles (default) */
        flex items-center gap-4 p-3 w-full
        border border-transparent hover:border-indigo-500/30
        
        /* Tablet styles (640px and up) */
        sm:flex-col sm:p-0 sm:w-full sm:gap-0
        sm:bg-slate-800/30
        
        /* Desktop styles (1024px and up) */
        lg:hover:scale-105
      "
    >
      {/* Thumbnail Container */}
      <div className="relative flex-shrink-0">
        <div
          className="
            overflow-hidden rounded-lg
            w-14 h-14
            shadow-lg shadow-black/30
            
            sm:w-full sm:h-36 sm:rounded-t-xl sm:rounded-b-none
            md:h-40
            lg:h-44
          "
        >
          <img
            src={thumbnail || "https://via.placeholder.com/400x400"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        
        {/* Play Button Overlay - Visible on hover */}
        <div className="
          absolute inset-0 bg-black/40 rounded-lg
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          flex items-center justify-center
          sm:rounded-t-xl sm:rounded-b-none
        ">
          <div className="
            w-8 h-8 bg-indigo-600 rounded-full 
            flex items-center justify-center
            transform translate-y-2 group-hover:translate-y-0
            transition-transform duration-300
            shadow-lg shadow-indigo-600/50
          ">
            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>

      </div>

      {/* Content Section */}
      <div className="
        flex-1 min-w-0
        sm:p-3 sm:w-full
        md:p-4
      ">
        {/* Title and Artist */}
        <div className="space-y-1">
          <h3 className="
            text-sm font-semibold
            truncate
            group-hover:text-indigo-400
            transition-colors
            
            sm:text-base
            md:text-lg
          ">
            {title}
          </h3>
          
          <p className="
            text-xs
            text-gray-400
            truncate
            flex items-center gap-1
            
            sm:text-sm
          ">
            <svg className="w-3 h-3 text-indigo-400 sm:hidden" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0 2c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6-6c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V10c0-1.1.9-2 2-2h1V6c0-2.76 2.24-5 5-5s5 2.24 5 5v2h1zM8 6v2h8V6c0-2.21-1.79-4-4-4S8 3.79 8 6z"/>
            </svg>
            {artist}
          </p>
        </div>

        {/* Metadata Row - Tablet/Desktop Only */}
        <div className="
          hidden
          sm:flex sm:items-center sm:justify-between sm:mt-3
        ">
       
          
          {/* Play count or likes */}
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-indigo-400/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span className="text-xs text-indigo-300/40">1.2k</span>
          </div>
        </div>

        {/* Progress Bar - For playing state (optional) */}
        {isPlaying && (
          <div className="mt-2 sm:hidden">
            <div className="h-1 bg-indigo-900/30 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}