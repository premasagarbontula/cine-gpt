import { TMDB_POSTER_PATH } from "../../utils/constants";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import { GENRE_ID_MAP } from "../../utils/staticApiData";
import ShowMoreInfo from "../ShowMoreInfo/ShowMoreInfo";

const VideoTitle = ({ title, overview, posterPath, releaseDate, genreIds }) => {
  const [isShowMoreInfo, setIsShowMoreInfo] = useState(false);

  // Construct full poster image path
  const posterImage = `${TMDB_POSTER_PATH}${posterPath}`;

  // Convert genre IDs to readable genre names
  const genres = Array.isArray(genreIds)
    ? genreIds
        .map((gId) => GENRE_ID_MAP[gId])
        .filter(Boolean)
        .join(", ")
    : "Unknown";

  return (
    <>
      {/* Title and Buttons Overlay */}
      <div
        className={`absolute inset-0 w-full h-full top-[12%] flex flex-col px-4 md:px-12 text-white justify-center transition-opacity duration-300 ${
          isShowMoreInfo ? "opacity-30" : "opacity-100"
        }`}
      >
        {/* Movie Title */}
        <h1 className="w-full md:w-1/3 text-xl sm:text-2xl md:text-4xl font-extrabold mb-4 drop-shadow-lg">
          {title}
        </h1>

        {/* Buttons: Play & More Info */}
        <div className="relative z-20 flex flex-wrap items-center gap-4">
          <button className="flex items-center gap-2 bg-white text-black px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base md:text-lg font-semibold hover:bg-gray-200 transition">
            <FaPlay /> Play
          </button>

          <button
            className="flex items-center gap-2 bg-gray-700 bg-opacity-70 text-white px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base md:text-lg font-semibold hover:bg-gray-600 transition"
            onClick={() => setIsShowMoreInfo(!isShowMoreInfo)}
          >
            <MdInfoOutline className="text-2xl md:text-4xl" />
            More Info
          </button>
        </div>
      </div>

      {/* Expanded Info Modal */}
      {isShowMoreInfo && (
        <ShowMoreInfo
          posterImage={posterImage}
          title={title}
          overview={overview}
          releaseDate={releaseDate}
          genres={genres}
          isShowMoreInfo={isShowMoreInfo}
          setIsShowMoreInfo={setIsShowMoreInfo}
        />
      )}
    </>
  );
};

export default VideoTitle;
