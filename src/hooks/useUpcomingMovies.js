import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../redux/moviesSlice";
import { fallbackUpcomingMovies } from "../utils/staticApiData";

export const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((state) => state.movies.upcomingMovies);

  const getUpcomingMovies = useCallback(async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        {
          ...API_OPTIONS,
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error("Failed to fetch TMDB data");

      const data = await response.json();
      dispatch(addUpcomingMovies(data.results));
    } catch (error) {
      dispatch(addUpcomingMovies(fallbackUpcomingMovies));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!upcomingMovies || upcomingMovies.length === 0) {
      getUpcomingMovies();
    }
  }, [getUpcomingMovies, upcomingMovies]);
};

export default useUpcomingMovies;
