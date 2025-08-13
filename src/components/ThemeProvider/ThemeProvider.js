import { useEffect } from "react";
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const theme = useSelector((state) => state.config.mode);

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove both classes first to avoid conflicts
    root.classList.remove("light", "dark");

    // Add the current theme class
    root.classList.add(theme);
  }, [theme]);

  return children;
};

export default ThemeProvider;
