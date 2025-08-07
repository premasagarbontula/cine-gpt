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
    <div className="px-10 py-4 relative">
      <h1 className="text-white text-2xl font-bold pb-2">{title}</h1>
      <div className="flex scrollbar-hide">
        <div className="relative flex space-x-2">
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
  );
};

export default MovieRow;
