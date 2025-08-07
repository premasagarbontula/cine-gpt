import { IoMdCloseCircle } from "react-icons/io";

const ShowMoreInfo = ({
  posterImage,
  title,
  overview,
  releaseDate,
  genres,
  isShowMoreInfo,
  setIsShowMoreInfo,
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80"
      // Fullscreen modal with centered content
    >
      <div className="relative flex flex-col md:flex-row w-[90%] md:w-[80%] max-w-5xl h-[90vh] md:h-[75vh] bg-gray-900 rounded-xl overflow-hidden animate-fade-in-scale shadow-xl">
        {/* Movie Poster */}
        <img
          src={posterImage}
          alt={title}
          className="w-full md:w-1/2 h-64 md:h-full object-fill"
        />

        {/* Text Info */}
        <div className="w-full md:w-1/2 px-4 py-6 overflow-y-auto h-full">
          <h2 className="text-2xl md:text-3xl text-red-700 font-extrabold mb-1 mt-3 drop-shadow-lg">
            {title}
          </h2>
          <p className="py-2 text-base md:text-lg text-white">{overview}</p>
          <p className="py-2 text-base md:text-xl font-bold text-gray-500">
            Releasing on: <span className="text-blue-500">{releaseDate}</span>
          </p>
          <p className="py-2 text-base md:text-xl font-bold text-gray-500">
            Genres: <span className="text-blue-500">{genres}</span>
          </p>
        </div>

        {/* Close Button */}
        <button
          className="absolute right-3 top-3 z-10 text-white text-4xl focus:outline-none"
          onClick={() => setIsShowMoreInfo(!isShowMoreInfo)}
        >
          <IoMdCloseCircle />
        </button>
      </div>
    </div>
  );
};

export default ShowMoreInfo;
