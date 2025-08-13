import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieNames: null,
    movieResults: null,
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    toggleGptSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
      state.loading = false;
    },
    clearGptResults: (state) => {
      state.movieNames = [];
      state.movieResults = [];
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  toggleGptSearchView,
  addGptMovieResult,
  clearGptResults,
} = gptSlice.actions;
export default gptSlice.reducer;
