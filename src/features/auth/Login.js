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
import { getThemeStyles } from "../../utils/themeConstants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.user);
  const langKey = useSelector((state) => state.config.lang);
  const mode = useSelector((state) => state.config.mode);
  const themeStyles = getThemeStyles(mode);
  const t = LANG[langKey];

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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
      navigate("/login", { replace: true });
    }
  }, [user, navigate, location.search]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

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
          let msg = t.authErrors.generic;
          if (error.code === "auth/email-already-in-use")
            msg = t.authErrors.emailInUse;
          else if (error.code === "auth/invalid-email")
            msg = t.authErrors.invalidEmail;
          else if (error.code === "auth/weak-password")
            msg = t.authErrors.weakPassword;
          setFormErrors({ email: msg });
        })
        .finally(() => setIsLoading(false));
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
          let msg = t.authErrors.generic;
          if (error.code === "auth/user-not-found")
            msg = t.authErrors.userNotFound;
          else if (error.code === "auth/wrong-password")
            msg = t.authErrors.wrongPassword;
          else if (error.code === "auth/invalid-email")
            msg = t.authErrors.invalidEmail;
          setFormErrors({ email: msg });
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className={`min-h-screen w-full ${themeStyles.pageBackground}`}>
      <Header />

      <div
        style={{ backgroundImage: `url(${BANNER_IMAGE})` }}
        className="bg-cover bg-center w-full min-h-screen flex items-center justify-center"
      >
        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-md sm:mx-4 mx-2 flex flex-col items-start justify-center py-10 px-6 sm:px-10 md:px-16 rounded-xl ${themeStyles.formBackground}`}
        >
          <h1
            className={`${themeStyles.headingText} font-bold text-2xl sm:text-3xl mb-6`}
          >
            {isSignInForm ? t.signIn : t.signUp}
          </h1>

          {!isSignInForm && (
            <>
              <input
                ref={nameRef}
                type="text"
                placeholder={t.namePlaceholder}
                className={`p-3 mb-3 w-full text-lg bg-transparent border rounded ${
                  themeStyles.inputText
                } ${
                  formErrors.name
                    ? themeStyles.inputError
                    : themeStyles.inputBorder
                }`}
                onBlur={() => handleNameInputError(nameRef, setFormErrors, t)}
                onKeyDown={handleKeyDown}
                required
              />
              {formErrors.name && (
                <p className={`${themeStyles.errorText} mb-4 mt-1`}>
                  {formErrors.name}
                </p>
              )}
            </>
          )}

          <input
            ref={emailRef}
            type="email"
            placeholder={t.emailPlaceholder}
            className={`p-3 w-full text-lg mb-3 bg-transparent border rounded ${
              themeStyles.inputText
            } ${
              formErrors.email
                ? themeStyles.inputError
                : themeStyles.inputBorder
            }`}
            onBlur={() => handleEmailInputError(emailRef, setFormErrors, t)}
            onKeyDown={handleKeyDown}
            required
          />
          {formErrors.email && (
            <p className={`${themeStyles.errorText} mb-4 mt-1`}>
              {formErrors.email}
            </p>
          )}

          <input
            ref={passwordRef}
            type="password"
            placeholder={t.passwordPlaceholder}
            className={`p-3 mb-4 w-full text-lg bg-transparent border rounded ${
              themeStyles.inputText
            } ${
              formErrors.password
                ? themeStyles.inputError
                : themeStyles.inputBorder
            }`}
            onBlur={() =>
              handlePasswordInputError(passwordRef, setFormErrors, t)
            }
            onKeyDown={handleKeyDown}
            required
          />
          {formErrors.password && (
            <p className={`${themeStyles.errorText} mb-4 mt-1`}>
              {formErrors.password}
            </p>
          )}

          <button
            type="submit"
            className={`${themeStyles.primaryButton} p-3 font-bold w-full rounded transition duration-300 mb-6`}
            disabled={isLoading}
          >
            {isLoading ? t.processing : isSignInForm ? t.signIn : t.signUp}
          </button>

          <span className={`${themeStyles.secondaryText} text-sm mb-4`}>
            {isSignInForm ? t.signInAgreementText : t.signUpAgreementText}
          </span>

          <span className={`${themeStyles.secondaryText} text-sm sm:text-base`}>
            {isSignInForm ? t.toggleToSignUp : t.toggleToSignIn}
            <button
              type="button"
              className={`${themeStyles.linkText} font-bold hover:underline ml-1`}
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
