import { useEffect } from "react";
import Header from "../../components/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LANGUAGECONSTANTS as LANG } from "../../utils/languageConstants";
import { BANNER_IMAGE } from "../../utils/constants";

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.user); // get logged-in user from Redux
  const langKey = useSelector((state) => state.config.lang); // get selected language key
  const t = LANG[langKey]; // translation object

  // Redirect to "/browse" if user is already logged in and on the landing page
  useEffect(() => {
    if (user && location.pathname === "/") navigate("/browse");
  }, [user, navigate, location]);

  const handleSignUp = () => {
    navigate("/login?mode=signup");
  };

  return (
    <div>
      {/* Page Header */}
      <Header />

      {/* Background Banner with dark overlay */}
      <div
        style={{ backgroundImage: `url(${BANNER_IMAGE})` }}
        className="relative bg-cover bg-center w-full h-screen"
      >
        {/* Overlay to darken banner image */}
        <div className="absolute inset-0 bg-black bg-opacity-80">
          {/* Centered text container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 text-center">
              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white my-3">
                {t.landingPageHeading}
              </h1>

              {/* Pricing Text */}
              <p className="text-lg sm:text-xl md:text-2xl text-white font-semibold my-4">
                {t.landingPagePriceText}
              </p>

              {/* Signup Prompt Text */}
              <p className="text-lg sm:text-xl md:text-2xl text-white font-semibold my-4">
                {t.landingPageSignUpText}
              </p>

              {/* Sign Up Button */}
              <button
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded px-6 py-2 text-lg sm:text-xl md:text-2xl transition duration-300"
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
