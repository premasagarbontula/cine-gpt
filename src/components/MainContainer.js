import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";

const MainContainer = () => {
  useNowPlayingMovies();
  const movies = useSelector((state) => state.movies?.nowPlayingMovies);

  if (!movies || movies.length === 0) return null; // or a loader

  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];

  return (
    <div className="relative w-screen aspect-video">
      <VideoBackground movieId={randomMovie.id} />
      <VideoTitle
        title={randomMovie.title}
        // imagePath={randomMovie.backdrop_path || randomMovie.poster_path}
        overview={randomMovie.overview}
      />
    </div>
  );
};

export default MainContainer;
