import bannerImage from "../assets/cinegpt_banner.png";
export const BANNER_IMAGE = bannerImage;

export const CINEGPT_LOGO_URL = "";

export const getRandomColor = () => {
  const colors = [
    "bg-gradient-to-r from-red-400 to-pink-500",
    "bg-gradient-to-r from-green-400 to-blue-500",
    "bg-gradient-to-r from-yellow-400 to-orange-500",
    "bg-gradient-to-r from-purple-400 to-indigo-500",
    "bg-gradient-to-r from-teal-400 to-cyan-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_KEY}`,
  },
};

export const TMDB_BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";
export const TMDB_POSTER_PATH = "https://image.tmdb.org/t/p/w342";

export const SUPPORTED_LANGUAGES = [
  { id: "en", name: "English" },
  { id: "hi", name: "Hindi" },
  { id: "te", name: "Telugu" },
  { id: "es", name: "Spanish" },
];

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_API_KEY;
