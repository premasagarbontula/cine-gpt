import { createSlice } from "@reduxjs/toolkit";
const initialLang = localStorage.getItem("lang") || "en";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: initialLang,
    mode: "dark",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
      localStorage.setItem("lang", action.payload);
    },
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { changeLanguage, toggleTheme } = configSlice.actions;
export default configSlice.reducer;
