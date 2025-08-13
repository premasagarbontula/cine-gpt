import { useSelector } from "react-redux";
import MovieRow from "../../components/MovieRow/MovieRow";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults, loading } = useSelector(
    (state) => state.gpt
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!movieNames || movieNames.length === 0) return null;
  return (
    <div className="w-full min-h-screen px-4 sm:px-6 md:px-12 py-8 mt-16 bg-gray-200 dark:bg-black opacity-90 text-white border-t border-gray-700 overflow-x-auto scrollbar-hide">
      {movieNames.map((movieName, index) => (
        <MovieRow
          key={movieName}
          title={movieName}
          movies={movieResults[index]}
        />
      ))}
    </div>
  );
};

export default GptMovieSuggestions;
