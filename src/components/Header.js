import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect, useState, useMemo } from "react";
import { NETFLIX_LOGO_URL, getRandomColor } from "../utils/constants";
import { IoIosArrowDown } from "react-icons/io";
import { useRef } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [onShowMenu, setOnShowMenu] = useState(false);

  const user = useSelector((state) => state.user);
  const initial = user?.displayName?.charAt(0).toUpperCase() || "U";
  const randomColor = useMemo(getRandomColor, []);

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
          navigate("/");
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch(() => navigate("/error"));
  };

  const timeoutRef = useRef(null);
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOnShowMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOnShowMenu(false);
    }, 500);
  };

  return (
    <header className="absolute w-full flex items-center justify-between px-8 md:px-32 py-2 bg-gradient-to-b from-black to-transparent z-40">
      <img className="w-32 md:w-44" src={NETFLIX_LOGO_URL} alt="Netflix Logo" />
      {user && (
        <div className="p-2 flex items-center gap-4">
          <h2 className="text-white hidden sm:block">
            Hello {user.displayName}
          </h2>

          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Avatar Button */}
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

            {/* Dropdown Menu */}
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
    </header>
  );
};

export default Header;
