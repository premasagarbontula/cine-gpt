import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-xs sm:text-sm py-6 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Social Links */}
        <div className="flex gap-4 text-xl">
          <a
            href="https://github.com/premasagarbontula"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/premasagarbontula"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:prem.b.sagar@gmail.com"
            className="hover:text-white transition-colors"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Disclaimer */}
        <p className="text-center leading-relaxed max-w-xl">
          This project is for{" "}
          <strong className="text-gray-300">educational purposes only</strong>{" "}
          and is not affiliated with, endorsed by, or connected to{" "}
          <strong className="text-gray-300">any platform</strong> or any other
          streaming service.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
