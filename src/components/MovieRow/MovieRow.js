import React, { useState } from "react";
import MovieCard from "../MovieCard/MovieCard";

const MovieRow = ({ title, movies }) => {
  const [activeCardId, setActiveCardId] = useState(null);

  const handleMouseEnter = (id) => {
    setActiveCardId(id);
  };

  const handleMouseLeave = () => {
    setActiveCardId(null);
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 py-4 relative">
      <h1 className="text-red-600 dark:text-white text-2xl md:text-xl font-bold mb-0">
        {title}
      </h1>
      <div className="relative -mt-6">
        <div className="overflow-x-scroll scrollbar-hide pl-4 md:pl-8 lg:pl-16 -ml-4 md:-ml-8 lg:-ml-16">
          <div
            className="flex space-x-4 pb-6 pt-10"
            style={{ width: "max-content" }}
          >
            {movies?.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                posterPath={movie.poster_path}
                title={movie.title}
                genreIds={movie.genre_ids}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                isActive={activeCardId === movie.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
