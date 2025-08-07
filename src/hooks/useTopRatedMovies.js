import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMoviesMovies } from "../redux/moviesSlice";
import { fallbackTopRatedMovies } from "../utils/staticApiData";

export const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((state) => state.movies.topRatedMovies);

  const getTopRatedMovies = useCallback(async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        {
          ...API_OPTIONS,
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error("Failed to fetch TMDB data");

      const data = await response.json();
      dispatch(addTopRatedMoviesMovies(data.results));
    } catch (error) {
      dispatch(addTopRatedMoviesMovies(fallbackTopRatedMovies));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!topRatedMovies || topRatedMovies.length === 0) {
      getTopRatedMovies();
    }
  }, [getTopRatedMovies, topRatedMovies]);
};

export default useTopRatedMovies;
