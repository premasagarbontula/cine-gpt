import { useRef, useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import {
  checkValidDataFields,
  handleEmailInputError,
  handlePasswordInputError,
  handleNameInputError,
} from "../../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/userSlice";
import { LANGUAGECONSTANTS as LANG } from "../../utils/languageConstants";
import { BANNER_IMAGE } from "../../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.user);
  const langKey = useSelector((state) => state.config.lang);
  const t = LANG[langKey];

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Auto redirect if already logged in or URL query param exists
  useEffect(() => {
    if (user) {
      navigate("/browse");
      return;
    }

    const params = new URLSearchParams(location.search);
    const mode = params.get("mode");

    if (mode === "signup") setIsSignInForm(false);
    else if (mode === "signin") setIsSignInForm(true);

    if (mode === "signup" || mode === "signin") {
      navigate("/login", { replace: true }); // Remove query param
    }
  }, [user, navigate, location.search]);

  // Handles login/signup submit
  const handleSubmit = () => {
    const name = isSignInForm ? undefined : nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    const errors = checkValidDataFields(email, password, name, t);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsLoading(true);

    // SIGN UP
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          await updateProfile(user, { displayName: name });
          await user.reload();
          const updatedUser = auth.currentUser;

          const { uid, email, displayName } = updatedUser;
          dispatch(addUser({ uid, email, displayName }));
          navigate("/browse");
        })
        .catch((error) => {
          let msg = "Something went wrong. Please try again.";
          if (error.code === "auth/email-already-in-use")
            msg = "Email already exists.";
          else if (error.code === "auth/invalid-email")
            msg = "Invalid email format.";
          else if (error.code === "auth/weak-password")
            msg = "Password is too weak.";
          setFormErrors({ email: msg });
        })
        .finally(() => setIsLoading(false));
    }

    // SIGN IN
    else {
      signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
          let msg = "Something went wrong. Please try again.";
          if (error.code === "auth/user-not-found") msg = "User not found.";
          else if (error.code === "auth/wrong-password")
            msg = "Incorrect password.";
          else if (error.code === "auth/invalid-email") msg = "Invalid email.";
          setFormErrors({ email: msg });
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className="min-h-screen w-full">
      <Header />

      {/* Full-screen background image container */}
      <div
        style={{ backgroundImage: `url(${BANNER_IMAGE})` }}
        className="bg-cover bg-center w-full min-h-screen flex items-center justify-center"
      >
        {/* Auth Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md sm:mx-4 mx-2 flex flex-col items-start justify-center py-10 px-6 sm:px-10 md:px-16 bg-black bg-opacity-85 rounded-xl"
        >
          <h1 className="text-white font-bold text-2xl sm:text-3xl mb-6">
            {isSignInForm ? t.signIn : t.signUp}
          </h1>

          {/* Name Field (only for Sign Up) */}
          {!isSignInForm && (
            <>
              <input
                ref={nameRef}
                type="text"
                placeholder={t.namePlaceholder}
                className={`p-3 w-full text-lg bg-transparent border rounded text-white ${
                  formErrors.name ? "border-red-500" : "border-gray-600 mb-3"
                }`}
                onBlur={() => handleNameInputError(nameRef, setFormErrors, t)}
                required
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1 mb-4">
                  {formErrors.name}
                </p>
              )}
            </>
          )}

          {/* Email Field */}
          <input
            ref={emailRef}
            type="email"
            placeholder={t.emailPlaceholder}
            className={`p-3 w-full text-lg bg-transparent border rounded text-white ${
              formErrors.email ? "border-red-500" : "border-gray-600 mb-3"
            }`}
            onBlur={() => handleEmailInputError(emailRef, setFormErrors, t)}
            required
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1 mb-4">{formErrors.email}</p>
          )}

          {/* Password Field */}
          <input
            ref={passwordRef}
            type="password"
            placeholder={t.passwordPlaceholder}
            className={`p-3 w-full text-lg bg-transparent border rounded text-white ${
              formErrors.password ? "border-red-500" : "border-gray-600 mb-3"
            }`}
            onBlur={() =>
              handlePasswordInputError(passwordRef, setFormErrors, t)
            }
            required
          />
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1 mb-4">
              {formErrors.password}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="button"
            className="bg-red-600 text-white p-2 font-bold w-full rounded hover:bg-red-700 transition duration-300 mb-6"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? t.processing : isSignInForm ? t.signIn : t.signUp}
          </button>

          {/* Agreement Text */}
          <span className="text-gray-400 text-sm mb-4">
            {isSignInForm ? t.signInAgreementText : t.signUpAgreementText}
          </span>

          {/* Toggle Signin/Signup */}
          <span className="text-gray-400 text-sm sm:text-base">
            {isSignInForm ? t.toggleToSignUp : t.toggleToSignIn}
            <button
              type="button"
              className="text-white font-bold hover:underline ml-1"
              onClick={() => {
                setFormErrors({});
                setIsSignInForm(!isSignInForm);
              }}
            >
              {isSignInForm ? t.signUpNow : t.signInNow}
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
