// import { TMDB_POSTER_PATH } from "../utils/constants";
import { FaPlay } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";

const VideoTitle = ({ title, imagePath, overview }) => {
  // const titleImage = `${TMDB_POSTER_PATH}${imagePath}`;

  return (
    <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center px-12 text-white bg-gradient-to-r from-black via-transparent to-transparent">
      {" "}
      {/* {titleImage && (
        <img
          src={titleImage}
          alt="Movie Title"
          className="w-[300px] mb-4 rounded-lg shadow-lg"
        />
      )} */}
      <h1 className="text-3xl md:text-4xl line-clamp-2 font-extrabold mb-2 drop-shadow-lg">
        {title}
      </h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="flex gap-4">
        <button className=" flex items-center gap-2 bg-white text-black px-8 py-2.5 rounded-md text-xl font-semibold hover:bg-gray-200 transition">
          <FaPlay /> Play
        </button>
        <button className="flex items-center gap-2 bg-gray-700 bg-opacity-70 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-gray-600 transition">
          <MdInfoOutline className="text-4xl" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
