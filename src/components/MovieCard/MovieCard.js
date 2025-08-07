import { TMDB_POSTER_PATH } from "../../utils/constants";
import { GENRE_ID_MAP } from "../../utils/staticApiData";
import { FaCirclePlay } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";

const MovieCard = ({
  title,
  isActive,
  id,
  posterPath,
  genreIds,
  onMouseEnter,
  onMouseLeave,
}) => {
  if (!posterPath) return null;

  const posterImage = `${TMDB_POSTER_PATH}${posterPath}`;
  const genres = Array.isArray(genreIds)
    ? genreIds
        .map((gId) => GENRE_ID_MAP[gId])
        .filter(Boolean)
        .join(", ")
    : "Unknown";

  const ShowActiveCardInfo = ({ posterImage, title, genres }) => {
    return (
      <div className="absolute z-50 -top-[5%] left-[-25%] w-[300px] h-[350px] bg-gray-900 rounded-xl shadow-lg overflow-hidden animate-fade-in-scale">
        <img
          src={posterImage}
          alt={title}
          className="w-full h-3/5 object-fill"
        />
        <div className="p-2">
          <h2 className="text-xl text-red-600 font-bold mb-1">{title}</h2>
          <div className="flex p-1 gap-2">
            <button className="text-3xl text-white">
              <FaCirclePlay />
            </button>
            <button className="text-3xl text-white">
              <CiCirclePlus />
            </button>
            <button className="text-3xl text-white">
              <AiOutlineLike />
            </button>
          </div>
          <p className="text-sm text-gray-300 p-1">
            Genres : <span className="text-blue-400">{genres}</span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div
      className="relative group w-28 md:w-48 flex-shrink-0 mr-2 border border-white rounded-lg transition-transform duration-300"
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={onMouseLeave}
    >
      <img src={posterImage} alt={title} className="rounded-lg" />

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
