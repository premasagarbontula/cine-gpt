import React from "react";
import MovieRow from "../../components/MovieRow/MovieRow";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((state) => state.movies);

  const shimmerCards = Array.from({ length: 7 }).map((_, i) => (
    <div
      key={i}
      className="w-32 sm:w-40 md:w-48 h-48 sm:h-56 md:h-60 bg-gray-700 rounded animate-pulse mx-1 sm:mx-2"
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
      <div className="w-full min-h-screen bg-black flex justify-center items-start px-4 sm:px-6 py-8 ">
        <div className="w-full max-w-7xl bg-gray-800 animate-pulse rounded-lg relative overflow-hidden">
          <div className="p-4 sm:p-6 space-y-6">
            {/* Section title shimmer */}
            <div className="w-1/2 sm:w-1/6 h-6 bg-gray-700 rounded"></div>

            {/* Horizontal shimmer cards */}
            <div className="flex overflow-x-auto scrollbar-hide">
              {shimmerCards}
            </div>

            {/* Another section title */}
            <div className="w-1/2 sm:w-1/6 h-6 bg-gray-700 rounded"></div>

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
    <div className="bg-black">
      <div className="relative -mt-20 md:-mt-36 w-full px-2 sm:px-4">
        <MovieRow title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieRow title={"Top Rated"} movies={movies.topRatedMovies} />
        <MovieRow title={"Popular"} movies={movies.popularMovies} />
        <MovieRow title={"Upcoming"} movies={movies.upcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
