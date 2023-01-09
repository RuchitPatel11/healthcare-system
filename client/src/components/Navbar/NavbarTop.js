import React from "react";
import { Link } from "react-router-dom";
const NavbarTop = () => {
  return (
    <div className="bg-secondary  flex items-center py-3 justify-end">
      <div className="">
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
      </div>
      <div className="flex gap-3 mx-24">
        <Link to="/login">
          <button className="px-6 py-2 border-2 border-primary text-white font-medium  leading-tight rounded hover:bg-primary hover:text-white transition duration-150 ease-in-out">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-6 py-2 border-2 border-primary text-white font-medium  leading-tight rounded hover:bg-primary hover:text-white transition duration-150 ease-in-out">
            SignUp
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavbarTop;
