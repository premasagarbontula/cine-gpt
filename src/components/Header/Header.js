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
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { getThemeStyles } from "../../utils/themeConstants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // States
  const [onShowMenu, setOnShowMenu] = useState(false);

  // Redux selectors
  const showGptSearch = useSelector((state) => state.gpt.showGptSearch);
  const user = useSelector((state) => state.user);
  const langKey = useSelector((state) => state.config.lang);
  const mode = useSelector((state) => state.config.mode);

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

        if (window.location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());

        if (window.location.pathname !== "/") {
          navigate("/login");
        }
      }
    });

    return () => unsubscribe();
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

  const themeStyles = getThemeStyles(mode);

  return (
    <header
      className={`absolute w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-32 py-4 ${themeStyles.header} z-40 gap-4 md:gap-0`}
    >
      {/* Logo */}
      <Link to="/browse" className="text-4xl font-extrabold tracking-wide">
        <span className="bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
          Cine
        </span>
        <span className="drop-shadow-md">GPT</span>
      </Link>

      {/* Right Side Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <ThemeToggle />

        {(location.pathname === "/" ||
          location.pathname === "/login" ||
          (location.pathname === "/browse" && showGptSearch)) && (
          <div
            className={`flex items-center ${themeStyles.languageSelector} border-2 px-2 rounded-lg`}
          >
            <IoLanguage size={20} className={themeStyles.text} />
            <select
              className={`p-2 rounded-md outline-none ${themeStyles.languageSelector}`}
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

        {/* Sign In Button */}
        {location.pathname === "/" && !user && (
          <button
            type="button"
            className={`${themeStyles.signInButton} font-semibold rounded px-6 py-2 text-lg sm:text-xl md:text-2xl transition duration-300`}
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
              className={`${themeStyles.gptButton} px-3 py-2 rounded-lg font-bold transition duration-200 focus:outline-none`}
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Home" : "GPT Search"}
            </button>

            <h2 className="hidden sm:block text-lg font-bold">
              Hello {user.displayName}
            </h2>

            {/* Avatar & Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center gap-1 px-2 py-1 rounded-full bg-transparent ${themeStyles.avatarButton} transition duration-200 focus:outline-none group`}
              >
                <span
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg uppercase ${randomColor} font-playfair`}
                >
                  {initial}
                </span>
                <IoIosArrowDown
                  className={`text-xl transition-transform duration-200 ${
                    onShowMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {onShowMenu && (
                <ul
                  className={`absolute top-14 right-0 ${themeStyles.dropdown} rounded-md shadow-lg z-50 py-2 min-w-[150px] transition-all duration-200 ease-in-out border ${themeStyles.divider}`}
                >
                  <li className={`${themeStyles.dropdownItem} transition`}>
                    <button className="w-full text-left px-4 py-2">
                      Profile
                    </button>
                  </li>
                  <li className={`border-t ${themeStyles.divider} my-1`}></li>
                  <li className={`${themeStyles.signOutButton} transition`}>
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
