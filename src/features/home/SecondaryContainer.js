import MovieRow from "../../components/MovieRow/MovieRow";
import { useSelector } from "react-redux";
import { getThemeStyles } from "../../utils/themeConstants";

const SecondaryContainer = () => {
  const movies = useSelector((state) => state.movies);
  const mode = useSelector((state) => state.config.mode);
  const themeStyles = getThemeStyles(mode);

  const shimmerCards = Array.from({ length: 7 }).map((_, i) => (
    <div
      key={i}
      className={`w-32 sm:w-40 md:w-48 h-48 sm:h-56 md:h-60 ${themeStyles.skeletonCard} rounded animate-pulse mx-1 sm:mx-2`}
    ></div>
  ));

  // Fallback shimmer UI while movie categories are loading
  if (
    !movies ||
    !movies.nowPlayingMovies ||
    !movies.popularMovies ||
    !movies.topRatedMovies ||
    !movies.upcomingMovies
  ) {
    return (
      <div
        className={`w-full min-h-screen ${themeStyles.pageBackground} flex justify-center items-start px-4 sm:px-6 py-8`}
      >
        <div
          className={`w-full max-w-7xl ${themeStyles.skeletonContainer} animate-pulse rounded-lg relative overflow-hidden`}
        >
          <div className="p-4 sm:p-6 space-y-6">
            {/* Section title shimmer */}
            <div
              className={`w-1/2 sm:w-1/6 h-6 ${themeStyles.skeletonElement} rounded`}
            ></div>

            {/* Horizontal shimmer cards */}
            <div className="flex overflow-x-auto scrollbar-hide">
              {shimmerCards}
            </div>

            {/* Another section title */}
            <div
              className={`w-1/2 sm:w-1/6 h-6 ${themeStyles.skeletonElement} rounded`}
            ></div>

            {/* Another shimmer row */}
            <div className="flex overflow-x-auto scrollbar-hide">
              {shimmerCards}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // When movies are loaded
  return (
    <div className="bg-gray-200 dark:bg-black">
      <div className="relative -mt-[12rem]  md:-mt-[9rem] lg:-mt-[8rem] w-full px-2 sm:px-4">
        <MovieRow title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieRow title={"Top Rated"} movies={movies.topRatedMovies} />
        <MovieRow title={"Popular"} movies={movies.popularMovies} />
        <MovieRow title={"Upcoming"} movies={movies.upcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
