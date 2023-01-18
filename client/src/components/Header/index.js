import React from "react";
import { Link } from "react-router-dom";
import HeaderLinks from "./HeaderLinks";
import Logo from "../../assets/Logo/healthcare_logo.png";
import PrimaryButton from "./PrimaryButton";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { auth, dispatch } = useAuth();

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
        <div className="flex items-center gap-8">
          <div className="flex gap-6">
            <HeaderLinks />
          </div>

          <div>
            {auth.isAuthenticated ? (
              <div className="flex gap-3">
                <div className="flex items-center gap-1 p-3 text-white bg-purple">
                  <span className="fa-solid fa-user-tie"></span>
                  <h1 className="text-xl font-medium">
                    Welcome, {auth.user.first_name} {auth.user.last_name}
                  </h1>
                </div>

                <button
                  className="flex items-center gap-1 px-6 py-2 text-lg font-medium leading-tight transition duration-300 border-2 rounded text-secondary border-secondary hover:bg-secondary hover:text-white hover:border-primary"
                  onClick={() => {
                    dispatch({ type: "loggedOut" });
                  }}
                >
                  Logout
                  <span class="fa-solid fa-person-walking-arrow-right"></span>
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <PrimaryButton link={"/login"} name="Login" />
                <PrimaryButton link={"/register"} name="SignUp" />
              </div>
            )}
          </div>
        </div>
        {/* <div className="flex items-center justify-end py-3 bg-secondary">
          <div className="relative text-lg text-white">
            <input
              type="search"
              id="search"
              name="search"
              className="block w-full px-4 py-3 shadow-sm pl-11 bg-secondary text-md"
              placeholder="Quick Search..."
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <span className="fa-solid fa-magnifying-glass"></span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
