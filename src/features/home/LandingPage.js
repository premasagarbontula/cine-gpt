import { useEffect } from "react";
import Header from "../../components/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LANGUAGECONSTANTS as LANG } from "../../utils/languageConstants";
import { BANNER_IMAGE } from "../../utils/constants";
import { getThemeStyles } from "../../utils/themeConstants";

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.user);
  const langKey = useSelector((state) => state.config.lang);
  const mode = useSelector((state) => state.config.mode);
  const themeStyles = getThemeStyles(mode);

  const t = LANG[langKey];

  // Redirect to "/browse" if user is already logged in
  useEffect(() => {
    if (user && location.pathname === "/") navigate("/browse");
  }, [user, navigate, location]);

  const handleSignUp = () => {
    navigate("/login?mode=signup");
  };

  return (
    <div className={themeStyles.pageBackground}>
      {/* Page Header */}
      <Header />

      {/* Background Banner with theme-based overlay */}
      <div
        style={{ backgroundImage: `url(${BANNER_IMAGE})` }}
        className="relative bg-cover bg-center w-full h-screen"
      >
        {/* Dynamic overlay based on theme */}
        <div className={`absolute inset-0 ${themeStyles.bannerOverlay}`}>
          {/* Centered content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 text-center">
              {/* Heading */}
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold my-3 ${themeStyles.headingText}`}
              >
                {t.landingPageHeading}
              </h1>

              {/* Pricing Text */}
              <p
                className={`text-lg sm:text-xl md:text-2xl font-semibold my-4 ${themeStyles.bodyText}`}
              >
                {t.landingPagePriceText}
              </p>

              {/* Signup Prompt Text */}
              <p
                className={`text-lg sm:text-xl md:text-2xl font-semibold my-4 ${themeStyles.bodyText}`}
              >
                {t.landingPageSignUpText}
              </p>

              {/* Sign Up Button */}
              <button
                type="button"
                className={`${themeStyles.signOutButton} font-semibold rounded px-6 py-2 text-lg sm:text-xl md:text-2xl transition duration-300`}
                onClick={handleSignUp}
              >
                {t.signUp}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
