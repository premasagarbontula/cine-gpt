export const NETFLIX_LOGO_URL =
  "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-14/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

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
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  },
};
