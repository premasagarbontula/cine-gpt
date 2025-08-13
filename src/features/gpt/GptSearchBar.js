import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { LANGUAGECONSTANTS as LANG } from "../../utils/languageConstants";
import openai from "../../utils/openai";
import { API_OPTIONS } from "../../utils/constants";
import {
  setLoading,
  addGptMovieResult,
  clearGptResults,
} from "../../redux/gptSlice";
import { MdCancel } from "react-icons/md";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((state) => state.config.lang);
  const t = LANG[langKey];
  const gptSearchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          movie
        )}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );

      if (!response.ok)
        throw new Error(`Failed to fetch TMDB data: ${response.statusText}`);

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("TMDB API Error:", error.message);
      return [];
    }
  };

  const handleGptSearch = async () => {
    if (!gptSearchText.current?.value) return;

    try {
      dispatch(setLoading(true));

      const query = `Act as a Movie Recommendation System and suggest some movies for the query: ${gptSearchText.current.value}. Only give me names of 5 movies, comma separated. Example: Transformers,Gadar,Don,Sholay,Avengers`;

      const gptResults = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: query }],
      });

      const gptResponse = gptResults?.choices?.[0]?.message?.content;

      if (!gptResponse) {
        alert("No results found. Please try again.");
        dispatch(setLoading(false));
        return;
      }

      const gptMovies = gptResponse.split(",").map((m) => m.trim());
      const moviePromises = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(moviePromises);

      dispatch(
        addGptMovieResult({
          movieNames: gptMovies,
          movieResults: tmdbResults,
        })
      );
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      alert("Failed to fetch movie recommendations. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGptSearchClick = async (e) => {
    e.preventDefault();
    await handleGptSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGptSearch();
    }
  };

  const handleClearInput = () => {
    if (gptSearchText.current) {
      gptSearchText.current.value = "";
    }
    dispatch(clearGptResults());
  };

  return (
    <div className="pt-20 flex justify-center px-4 sm:px-8">
      <form
        className="w-full max-w-2xl grid grid-cols-12 gap-2 bg-black bg-opacity-70 border-2 rounded-lg px-4 py-3"
        onSubmit={handleGptSearchClick}
      >
        {/* Input Field */}
        <div className="col-span-12 md:col-span-9 relative flex items-center">
          <input
            type="text"
            placeholder={t.gptSearchPlaceholder}
            className="w-full p-3 pr-10 rounded text-black text-sm sm:text-base"
            ref={gptSearchText}
            onKeyDown={handleKeyDown}
          />
          <MdCancel
            size={22}
            className="text-gray-600 absolute right-3 cursor-pointer hover:text-red-500"
            onClick={handleClearInput}
          />
        </div>

        {/* Search Button */}
        <div className="col-span-12 md:col-span-3 flex items-center justify-center">
          <button
            className="w-full bg-red-500 hover:bg-red-600 transition text-white text-sm sm:text-base rounded-lg px-4 py-2"
            type="submit"
          >
            {t.search}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GptSearchBar;
