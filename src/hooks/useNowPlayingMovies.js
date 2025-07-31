import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { fallbackNowPlayingMovies } from "../utils/staticApiData";

export const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS
      );

      if (!response.ok) throw new Error("Failed to fetch TMDB data");

      const data = await response.json();
      dispatch(addNowPlayingMovies(data.results));
    } catch (error) {
      console.log(error);
      console.error("TMDB fetch failed, using fallback:", error);
      dispatch(addNowPlayingMovies(fallbackNowPlayingMovies));
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
