import { useRef, useState, useEffect } from "react";
import Header from "./Header";
import {
  checkValidDataFields,
  handleEmailInputError,
  handlePasswordInputError,
  handleNameInputError,
} from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (user) navigate("/browse");
  }, [user, navigate]);

  const handleSubmit = () => {
    const name = isSignInForm ? undefined : nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    const errors = checkValidDataFields(email, password, name);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsLoading(true);

    if (!isSignInForm) {
      // Sign Up
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          await updateProfile(user, {
            displayName: name,
          });
          // Force reload to get updated displayName
          await user.reload();
          const updatedUser = auth.currentUser;

          const { uid, email, displayName } = updatedUser;

          dispatch(addUser({ uid, email, displayName }));
          navigate("/browse");
        })
        .catch((error) => {
          let msg = "Something went wrong. Please try again.";
          if (error.code === "auth/email-already-in-use") {
            msg = "Email already exists.";
          } else if (error.code === "auth/invalid-email") {
            msg = "Invalid email format.";
          } else if (error.code === "auth/weak-password") {
            msg = "Password is too weak.";
          }
          setFormErrors({ email: msg });
        })
        .finally(() => setIsLoading(false));
    } else {
      // Sign In
      signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
          let msg = "Something went wrong. Please try again.";
          if (error.code === "auth/user-not-found") {
            msg = "User not found.";
          } else if (error.code === "auth/wrong-password") {
            msg = "Incorrect password.";
          } else if (error.code === "auth/invalid-email") {
            msg = "Invalid email.";
          }
          setFormErrors({ email: msg });
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-netflix-lg-banner bg-cover bg-center w-full h-screen flex items-center justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md flex flex-col items-start justify-center py-10 px-16 bg-black bg-opacity-85 rounded-xl"
        >
          <h1 className="text-white text-left font-bold text-3xl mb-6">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <>
              <input
                ref={nameRef}
                type="text"
                placeholder="Full Name"
                className={`p-3 w-full text-lg bg-transparent border rounded text-white ${
                  formErrors.name ? "border-red-500" : "border-gray-600 mb-3"
                }`}
                onBlur={() => handleNameInputError(nameRef, setFormErrors)}
                required
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1 mb-4">
                  {formErrors.name}
                </p>
              )}
            </>
          )}

          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className={`p-3 w-full text-lg bg-transparent border rounded text-white ${
              formErrors.email ? "border-red-500" : "border-gray-600 mb-3"
            }`}
            onBlur={() => handleEmailInputError(emailRef, setFormErrors)}
            required
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1 mb-4">{formErrors.email}</p>
          )}

          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className={`p-3 w-full text-lg bg-transparent border rounded text-white ${
              formErrors.password ? "border-red-500" : "border-gray-600 mb-3"
            }`}
            onBlur={() => handlePasswordInputError(passwordRef, setFormErrors)}
            required
          />
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1 mb-4">
              {formErrors.password}
            </p>
          )}

          <button
            type="button"
            className="bg-red-600 text-white p-2 font-bold w-full rounded hover:bg-red-700 transition duration-300 mb-6"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <span className="text-gray-400 text-sm mb-4">
            {isSignInForm
              ? "By signing in, you agree to our Terms of Use and Privacy Policy."
              : "By signing up, you agree to our Terms of Use and Privacy Policy."}
          </span>

          <span className="text-gray-400 text-md text-center">
            {isSignInForm ? "New to Netflix?" : "Already have an account?"}
            <button
              type="button"
              className="text-white font-bold text-lg hover:underline ml-1"
              onClick={() => {
                setFormErrors({});
                setIsSignInForm(!isSignInForm);
              }}
            >
              {isSignInForm ? "Sign up now." : "Sign in now."}
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
