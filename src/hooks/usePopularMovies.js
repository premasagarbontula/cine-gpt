import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../redux/moviesSlice";
import { fallbackPopularMovies } from "../utils/staticApiData";

export const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((state) => state.movies.popularMovies);

  const getPopularMovies = useCallback(async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          ...API_OPTIONS,
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error("Failed to fetch TMDB data");

      const data = await response.json();
      dispatch(addPopularMovies(data.results));
    } catch (error) {
      dispatch(addPopularMovies(fallbackPopularMovies));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!popularMovies || popularMovies.length === 0) {
      getPopularMovies();
    }
  }, [getPopularMovies, popularMovies]);
};

export default usePopularMovies;
