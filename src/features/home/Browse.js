import Header from "../../components/Header/Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useNowPlayingMovies from "../../hooks/useNowPlayingMovies";
import usePopularMovies from "../../hooks/usePopularMovies";
import useTopRatedMovies from "../../hooks/useTopRatedMovies";
import useUpcomingMovies from "../../hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import GptSearchPage from "../gpt/GptSearch";

const Browse = () => {
  const showGptSearch = useSelector((state) => state.gpt.showGptSearch);

  // Custom hooks to preload movie data into redux
  useNowPlayingMovies();
  useTopRatedMovies();
  usePopularMovies();
  useUpcomingMovies();

  return (
    <div className="min-h-screen w-full flex flex-col bg-black text-white">
      {/* Sticky header that stays on top */}
      <Header />

      {/* Conditional GPT Search View OR Main Movie UI */}
      {showGptSearch ? (
        <GptSearchPage />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
