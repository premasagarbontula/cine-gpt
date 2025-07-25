import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  return (
    <div>
      <Header />
      <div className="bg-netflix-lg-banner bg-cover bg-center w-full h-screen flex items-center justify-center">
        <form className="sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 flex flex-col items-start justify-center py-10 px-16 bg-black bg-opacity-85 rounded-lg">
          <h1 className="text-white text-left font-bold text-3xl mb-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 mb-4 w-full text-lg bg-transparent border border-gray-600 text-white rounded"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="p-3 mb-4 w-full text-lg bg-transparent border border-gray-600 text-white rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 mb-4 w-full text-lg bg-transparent border border-gray-600 text-white rounded"
          />
          <button className="bg-red-600 text-white p-2 mb-4 font-bold w-full rounded hover:bg-red-700 transition duration-300">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-white text-center self-center mb-4">OR</p>
          <a
            href="#"
            className="text-white hover:underline text-center self-center mb-4"
          >
            Forgot Password?
          </a>
          <span className="text-gray-400 text-md text-center">
            {isSignInForm ? "New to Netflix? " : "Already have an account? "}
            <a
              href="#"
              className="text-white font-bold text-lg hover:underline"
              onClick={() => setIsSignInForm(!isSignInForm)}
            >
              {isSignInForm ? "Sign up now." : "Sign in now."}
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
