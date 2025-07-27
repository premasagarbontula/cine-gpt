import React from "react";
import AuthListener from "./AuthListener";
import Header from "./Header";

const Browse = () => {
  return (
    <div>
      <AuthListener />
      <Header />
      <h1>Browse Page</h1>
    </div>
  );
};

export default Browse;
