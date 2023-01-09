import React from "react";
import { Link } from "react-router-dom";
const NavbarBottom = () => {
  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-24 h-auto">
            <Link to="/">
              <img src="/Logo/healthcare_logo.png" alt="healthcare-logo.png" />
            </Link>
          </div>
          <div>
            <h1>Healthcare</h1>
          </div>
        </div>
        <div className="flex gap-6">
          <Link to="/">
            <button className="font-medium text-2xl hover:underline decoration-4 text-secondary hover:opacity-70">
              Home
            </button>
          </Link>
          <Link to="/about-us">
            <button className="font-medium text-2xl hover:underline decoration-4 text-secondary hover:opacity-70">
              About Us
            </button>
          </Link>
          <Link to="/contact-us">
            <button className="font-medium text-2xl hover:underline decoration-4 text-secondary hover:opacity-70">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarBottom;
