import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideoKey: {},
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideoKey: (state, action) => {
      const { movieId, key } = action.payload;
      state.trailerVideoKey[movieId] = key;
    },
  },
});

export const { addNowPlayingMovies, addTrailerVideoKey } = moviesSlice.actions;

export default moviesSlice.reducer;
