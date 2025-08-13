import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/configSlice";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.config.mode);
  const isDark = mode === "dark";

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`relative flex items-center justify-between w-24 h-10 rounded-full px-1 transition-colors duration-200 ${
        isDark ? "bg-gray-700" : "bg-gray-200"
      }`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span
        className={`text-lg font-medium transition-all duration-200 ${
          isDark ? "text-gray-300 ml-2" : "text-gray-700 ml-10"
        }`}
      >
        {isDark ? "Dark" : "Light"}
      </span>

      <div
        className={`absolute flex items-center justify-center w-8 h-8 rounded-full shadow-sm transition-all duration-200 ${
          isDark
            ? "bg-yellow-200 transform translate-x-14"
            : "bg-white transform translate-x-0"
        }`}
      >
        {isDark ? (
          <FiMoon className="text-gray-700 text-sm" />
        ) : (
          <FiSun className="text-yellow-500 text-sm" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
