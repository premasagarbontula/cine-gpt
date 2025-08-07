// src/features/home/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6">Sorry, the page you are looking for doesn't exist.</p>
      <Link
        to="/browse"
        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
