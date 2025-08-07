import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../../redux/userSlice";
import { useEffect, useState, useMemo, useRef } from "react";
import { SUPPORTED_LANGUAGES, getRandomColor } from "../../utils/constants";
import { LANGUAGECONSTANTS as LANG } from "../../utils/languageConstants";
import { IoIosArrowDown } from "react-icons/io";
import { IoLanguage } from "react-icons/io5";
import { toggleGptSearchView } from "../../redux/gptSlice";
import { changeLanguage } from "../../redux/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // States
  const [onShowMenu, setOnShowMenu] = useState(false); // Avatar dropdown toggle

  // Redux selectors
  const showGptSearch = useSelector((state) => state.gpt.showGptSearch);
  const user = useSelector((state) => state.user);
  const langKey = useSelector((state) => state.config.lang);

  // Get user initial for avatar
  const initial = user?.displayName?.charAt(0).toUpperCase() || "U";

  // Memoize a random background color for avatar
  const randomColor = useMemo(getRandomColor, []);

  // Translation object for selected language
  const t = LANG[langKey];

  // Load saved language or use default
  const savedLanguage =
    SUPPORTED_LANGUAGES.find(
      (lang) => lang.id === localStorage.getItem("lang")
    ) || SUPPORTED_LANGUAGES[0];

  // Monitor auth state and redirect accordingly
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));

        // Redirect to browse if authenticated and at root
        if (window.location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());

        // Redirect to login if unauthenticated and not on home
        if (window.location.pathname !== "/") {
          navigate("/login");
        }
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, [dispatch, navigate]);

  // Event Handlers
  const handleSignIn = () => navigate("/login?mode=signin");

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch(() => navigate("/error"));
  };

  // Hover dropdown logic with delay
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOnShowMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOnShowMenu(false), 500);
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(changeLanguage(selectedLanguage));
    localStorage.setItem("lang", selectedLanguage);
  };

  return (
    <header className="absolute w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-32 py-4 bg-gradient-to-b from-black to-transparent z-40 gap-4 md:gap-0">
      {/* Logo */}
      <Link
        to="/browse"
        className="text-4xl font-extrabold text-white tracking-wide"
      >
        <span className="bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
          Cine
        </span>
        <span className="text-white drop-shadow-md">GPT</span>
      </Link>

      {/* Right Side Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
        {(location.pathname === "/" ||
          location.pathname === "/login" ||
          (location.pathname === "/browse" && showGptSearch)) && (
          <div className="flex items-center bg-gray-900 text-white border-2 px-2 rounded-lg">
            <IoLanguage size={20} />
            <select
              className="p-2 rounded-md bg-gray-900 text-white outline-none"
              onChange={handleLanguageChange}
              value={savedLanguage.id}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* Sign In Button (if on home or login) */}
        {location.pathname === "/" && !user && (
          <button
            type="button"
            className="bg-red-600 text-white text-lg md:text-xl px-4 py-2 font-semibold rounded hover:bg-red-700 transition duration-300"
            onClick={handleSignIn}
          >
            {t.signIn}
          </button>
        )}

        {/* Logged in User Section */}
        {user && (
          <div className="flex items-center gap-4">
            {/* GPT Toggle */}
            <button
              className="text-black bg-red-600 px-3 py-2 rounded-lg font-bold hover:bg-white transition duration-200 focus:outline-none"
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Home" : "GPT Search"}
            </button>

            <h2 className="text-white hidden sm:block text-lg font-bold">
              Hello {user.displayName}
            </h2>

            {/* Avatar & Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1 px-2 py-1 rounded-full bg-transparent hover:bg-white/10 transition duration-200 focus:outline-none group">
                <span
                  className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-lg uppercase ${randomColor} font-playfair`}
                >
                  {initial}
                </span>
                <IoIosArrowDown
                  className={`text-white text-xl transition-transform duration-200 ${
                    onShowMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {onShowMenu && (
                <ul className="absolute top-14 right-0 bg-black text-white rounded-md shadow-lg z-50 py-2 min-w-[150px] transition-all duration-200 ease-in-out">
                  <li className="hover:bg-gray-700 transition">
                    <button className="w-full text-left px-4 py-2">
                      Profile
                    </button>
                  </li>
                  <li className="border-t border-gray-700 my-1"></li>
                  <li className="hover:bg-red-600 transition">
                    <button
                      className="w-full text-left px-4 py-2"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
