import React from "react";
import { useSelector } from "react-redux";
import MovieRow from "../../components/MovieRow/MovieRow";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((state) => state.gpt);

  if (!movieNames) return null;

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 md:px-12 py-8 mt-16 bg-black opacity-90 text-white border-t border-gray-700 overflow-x-auto scrollbar-hide">
      {/* Loop through each movie category and render */}
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
