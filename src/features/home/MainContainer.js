import { useSelector } from "react-redux";
import VideoBackground from "../../components/VideoBackground/VideoBackground";
import VideoTitle from "../../components/VideoTitle/VideoTitle";

const MainContainer = () => {
  const movies = useSelector((state) => state.movies.nowPlayingMovies);

  // If movies not loaded yet, show loading skeleton
  if (!movies || movies.length === 0) {
    return (
      <div className="w-full min-h-screen bg-black flex justify-center items-center px-4 sm:px-8">
        {/* Pulsing skeleton container */}
        <div className="w-full max-w-6xl h-[60vh] sm:h-[70vh] bg-gray-800 animate-pulse rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 space-y-4">
            <div className="w-2/3 sm:w-1/3 h-8 sm:h-10 bg-gray-700 rounded"></div>
            <div className="w-full sm:w-1/3 h-32 sm:h-44 bg-gray-700 rounded"></div>
            <div className="flex gap-2">
              <div className="w-1/4 sm:w-1/6 h-6 sm:h-8 bg-gray-700 rounded"></div>
              <div className="w-1/4 sm:w-1/6 h-6 sm:h-8 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pick a random movie to feature in background/title
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];

  return (
    <div className="relative w-screen min-h-screen">
      {/* Background video full screen */}
      <VideoBackground movieId={randomMovie.id} />

      {/* Overlay title and metadata */}
      <VideoTitle
        title={randomMovie.title}
        posterPath={randomMovie.poster_path}
        overview={randomMovie.overview}
        releaseDate={randomMovie.release_date}
        genreIds={randomMovie.genre_ids}
        movieId={randomMovie.id}
      />
    </div>
  );
};

export default MainContainer;
