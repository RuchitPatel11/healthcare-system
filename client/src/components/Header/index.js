import React from "react";
import { Link } from "react-router-dom";
import HeaderLinks from "./HeaderLinks";
import Logo from "../../assets/Logo/healthcare_logo.png";

const Header = () => {
  return (
    <div className="container">
      <div className="flex items-center justify-between p-2 ">
        <div className="relative flex items-center">
          <div className="w-24 h-auto">
            <Link to="/">
              <img src={Logo} alt="healthcare-logo.png" />
            </Link>
          </div>
          <div className="absolute top-2 left-16">
            <h1 className="text-xl font-bold tracking-wider font-charm-style text-secondary">
              Healthcare
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex gap-6">
            <HeaderLinks />
          </div>

          <div className="flex gap-3">
            <Link to="/login">
              <button className="px-6 py-2 font-medium leading-tight transition duration-150 ease-in-out border-2 rounded text-secondary border-secondary hover:bg-secondary hover:text-white">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="px-6 py-2 font-medium leading-tight transition duration-150 ease-in-out border-2 rounded text-secondary border-secondary hover:bg-secondary hover:text-white">
                SignUp
              </button>
            </Link>
          </div>
        </div>
        {/* <div className="flex items-center justify-end py-3 bg-secondary">
          <div class="relative text-white text-lg">
            <input
              type="search"
              id="search"
              name="search"
              class="py-3 px-4 pl-11 block w-full shadow-sm bg-secondary text-md"
              placeholder="Quick Search..."
            />
            <div class="absolute inset-y-0 left-0 flex items-center pl-4">
              <span class="fa-solid fa-magnifying-glass"></span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
