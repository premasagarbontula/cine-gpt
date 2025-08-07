import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideoKey } from "../redux/moviesSlice";
import { fallbackTrailerKeys } from "../utils/staticApiData";

const useTrailerVideoKey = (movieId) => {
  const dispatch = useDispatch();
  const trailerKey = useSelector(
    (state) => state.movies.trailerVideoKey[movieId]
  );

  useEffect(() => {
    const fetchTrailer = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          {
            ...API_OPTIONS,
            signal: controller.signal,
          }
        );
        clearTimeout(timeoutId);
        if (!data.ok) throw new Error("TMDB Video fetch failed");

        const json = await data.json();
        const trailer = json.results.find((video) => video.type === "Trailer");

        if (trailer) {
          dispatch(addTrailerVideoKey({ movieId, key: trailer.key }));
        } else {
          throw new Error("No trailer found");
        }
      } catch (error) {
        console.warn("Using fallback trailer key:", error.message);
        const fallbackKey = fallbackTrailerKeys[movieId];
        if (fallbackKey) {
          dispatch(addTrailerVideoKey({ movieId, key: fallbackKey }));
        }
      }
    };

    if (!trailerKey) {
      fetchTrailer();
    }
  }, [movieId, dispatch, trailerKey]);
};

export default useTrailerVideoKey;
