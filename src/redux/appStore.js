import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import moviesReducer from "../redux/moviesSlice";
import gptReducer from "../redux/gptSlice";
import configReducer from "../redux/configSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
  },
});
export default appStore;
