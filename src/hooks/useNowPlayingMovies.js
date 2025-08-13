import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../redux/moviesSlice";
import { fallbackNowPlayingMovies } from "../utils/staticApiData";

export const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (state) => state.movies.nowPlayingMovies
  );

  const getNowPlayingMovies = useCallback(async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        { ...API_OPTIONS, signal: controller.signal }
      );
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error("Failed to fetch TMDB data");

      const data = await response.json();
      dispatch(addNowPlayingMovies(data.results));
    } catch (error) {
      dispatch(addNowPlayingMovies(fallbackNowPlayingMovies));
    }
  }, [dispatch]);

  useEffect(() => {
    
    if (!nowPlayingMovies || nowPlayingMovies.length === 0) {
      getNowPlayingMovies();
    }
  }, [getNowPlayingMovies, nowPlayingMovies]);
};

export default useNowPlayingMovies;
