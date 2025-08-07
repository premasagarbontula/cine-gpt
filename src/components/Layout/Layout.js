import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <main className="flex-grow">
        <Outlet /> {/* Renders the child route components */}
      </main>
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
