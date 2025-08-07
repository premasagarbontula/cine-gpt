import { TMDB_POSTER_PATH } from "../../utils/constants";
import { GENRE_ID_MAP } from "../../utils/staticApiData";

const HoverPreviewCard = ({ movie, top, left, onMouseEnter, onMouseLeave }) => {
  if (!movie) return null;

  // Construct the poster image URL
  const posterImage = `${TMDB_POSTER_PATH}${movie.poster_path}`;

  // Convert genre IDs to names and join with commas
  const genres = movie.genre_ids
    ?.map((id) => GENRE_ID_MAP[id])
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className="absolute z-50 w-64 sm:w-72 md:w-80 h-[400px] bg-gray-900 rounded-xl shadow-2xl overflow-hidden transition-transform duration-300 ease-out scale-100 animate-fade-in-scale"
      style={{ top, left }} // Position based on mouse hover position
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Movie Poster */}
      <img
        src={posterImage}
        alt={movie.title}
        className="w-full h-2/3 object-cover"
      />

      {/* Movie Info */}
      <div className="p-3 sm:p-4">
        <h2 className="text-base sm:text-lg md:text-xl text-red-600 font-bold mb-1 truncate">
          {movie.title}
        </h2>

        {/* Genres */}
        <p className="text-xs sm:text-sm md:text-base text-gray-300">
          Genres: <span className="text-blue-400 break-words">{genres}</span>
        </p>
      </div>
    </div>
  );
};

export default HoverPreviewCard;
