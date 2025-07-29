import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";

const Browse = () => {
  // Custom hook to fetch now playing movies
  // and store them in Redux state
  useNowPlayingMovies();

  return (
    <div>
      <Header />
      <h1>Browse Page</h1>
    </div>
  );
};

export default Browse;
