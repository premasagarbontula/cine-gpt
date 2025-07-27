import { useRef, useState } from "react";
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
import AuthListener from "./AuthListener";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice"; // ✅ Make sure this path is correct

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = () => {
    const name = isSignInForm ? undefined : nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const errors = checkValidDataFields(email, password, name);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          return updateProfile(user, {
            displayName: name,
            photoURL:
              "https://avatars.githubusercontent.com/u/137033028?s=400&u=ca8a644c04873609f5ff0ec82e7b0802be7438c7&v=4",
          }).then(() => user.reload());
        })
        .then(() => {
          const currentUser = auth.currentUser;
          const { uid, email, displayName, photoURL } = currentUser;

          dispatch(
            addUser({
              uid,
              email,
              displayName,
              photoURL,
            })
          );

          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          let friendlyMessage = "Something went wrong. Please try again.";

          if (errorCode === "auth/email-already-in-use") {
            friendlyMessage = "Failed to sign up. Email already exists.";
          } else if (errorCode === "auth/invalid-email") {
            friendlyMessage = "Failed to sign up. Email is invalid.";
          } else if (errorCode === "auth/weak-password") {
            friendlyMessage = "Failed to sign up. Password is too weak.";
          }

          console.error("Error signing up:", errorCode, errorMessage);
          setFormErrors({ email: friendlyMessage });
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed in:", user);
          // Optionally, you can also dispatch the user to Redux
          // But if you use AuthListener, that may already handle it
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          let friendlyMessage = "Something went wrong. Please try again.";

          if (errorCode === "auth/user-not-found") {
            friendlyMessage = "Failed to sign in. User not found.";
          } else if (errorCode === "auth/wrong-password") {
            friendlyMessage = "Failed to sign in. Incorrect password.";
          } else if (errorCode === "INVALID_LOGIN_CREDENTIALS") {
            friendlyMessage = "Failed to sign in. Invalid login credentials.";
          }

          console.error("Error signing in:", errorCode, errorMessage);
          setFormErrors({ email: friendlyMessage });
        });
    }
  };

  return (
    <div>
      <AuthListener />
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
                  formErrors.name ? "border-red-500" : "border-gray-600"
                }`}
                onBlur={() => handleNameInputError(nameRef, setFormErrors)}
              />
              <div className="mb-4">
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1 mb-4">
                    {formErrors.name}
                  </p>
                )}
              </div>
            </>
          )}

          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className={`p-3 w-full text-lg bg-transparent border rounded text-white ${
              formErrors.email ? "border-red-500" : "border-gray-600"
            }`}
            onBlur={() => handleEmailInputError(emailRef, setFormErrors)}
          />
          <div className="mb-4">
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1 mb-4">
                {formErrors.email}
              </p>
            )}
          </div>

          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className={`p-3 w-full text-lg bg-transparent border rounded text-white ${
              formErrors.password ? "border-red-500" : "border-gray-600"
            }`}
            onBlur={() => handlePasswordInputError(passwordRef, setFormErrors)}
          />
          <div className="mb-4">
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1 mb-4">
                {formErrors.password}
              </p>
            )}
          </div>

          <button
            type="button"
            className="bg-red-600 text-white p-2 font-bold w-full rounded hover:bg-red-700 transition duration-300 mb-6"
            onClick={handleSubmit}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
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
