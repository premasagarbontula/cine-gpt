import { createSlice } from "@reduxjs/toolkit";
const initialLang = localStorage.getItem("lang") || "en";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: initialLang,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
      localStorage.setItem("lang", action.payload);
    },
  },
});

export const { changeLanguage } = configSlice.actions;
export default configSlice.reducer;
