import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BANNER_IMAGE } from "../../utils/constants";

const GptSearch = () => {
  return (
    <div
      style={{ backgroundImage: `url(${BANNER_IMAGE})` }}
      className="bg-cover bg-center w-full min-h-screen flex flex-col"
    >
      {/* GPT Search Input Bar */}
      <div className=" py-6 px-4 sm:px-8 mt-28">
        <GptSearchBar />
      </div>

      {/* Movie Suggestions Area */}
      <div className="flex-1 overflow-y-auto">
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearch;
