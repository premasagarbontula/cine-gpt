import { TMDB_POSTER_PATH } from "../../utils/constants";
import { GENRE_ID_MAP } from "../../utils/staticApiData";
import { FaCirclePlay } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";
import { useSelector } from "react-redux";

const MovieCard = ({
  title,
  isActive,
  id,
  posterPath,
  genreIds,
  onMouseEnter,
  onMouseLeave,
}) => {
  const trailerKey = useSelector((state) => state.movies?.trailerVideoKey[id]);
  if (!posterPath) return null;

  const posterImage = `${TMDB_POSTER_PATH}${posterPath}`;
  const genres = Array.isArray(genreIds)
    ? genreIds
        .map((gId) => GENRE_ID_MAP[gId])
        .filter(Boolean)
        .join(", ")
    : "Unknown";

  const handlePlayClick = () => {
    window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank");
  };

  const ShowActiveCardInfo = ({ posterImage, title, genres }) => {
    return (
      <div
        className="absolute z-50 w-[250px] sm:w-[300px] h-[300px] sm:h-[350px] 
                   -top-[10%] sm:-top-[15%] 
                   left-1/2 -translate-x-1/2 sm:left-[-25%] sm:translate-x-0
                   bg-gray-900 rounded-xl shadow-lg overflow-hidden animate-fade-in-scale"
        onClick={handlePlayClick}
      >
        <img
          src={posterImage}
          alt={title}
          className="w-full h-3/5 object-fill"
        />
        <div className="p-2">
          <h2 className="text-lg sm:text-xl text-red-600 font-bold mb-1">
            {title}
          </h2>
          <div className="flex p-1 gap-2">
            <button
              className="text-2xl sm:text-3xl text-white"
              onClick={handlePlayClick}
            >
              <FaCirclePlay />
            </button>
            <button className="text-2xl sm:text-3xl text-white">
              <CiCirclePlus />
            </button>
            <button className="text-2xl sm:text-3xl text-white">
              <AiOutlineLike />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-gray-300 p-1">
            Genres : <span className="text-blue-400">{genres}</span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div
      className="relative group w-24 sm:w-28 md:w-36 lg:w-48 flex-shrink-0 mr-2 border border-white rounded-lg transition-transform duration-300"
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={posterImage}
        alt={title}
        className="rounded-lg w-full h-full object-cover"
      />

      {isActive && (
        <ShowActiveCardInfo
          posterImage={posterImage}
          title={title}
          genres={genres}
        />
      )}
    </div>
  );
};

export default MovieCard;
