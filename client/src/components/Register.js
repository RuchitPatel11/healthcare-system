import { Link } from "react-router-dom";
import NavbarBottom from "./Navbar/NavbarBottom";

const Register = () => {
  return (
    <div>
      <NavbarBottom />

      <div className="container bg-white shadow-xl p-24">
        <div className="text-center">
          <p className="text-primary font-bold text-xl"> Choose Acount Type</p>
          <p className="text-mute">
            Please Fill Out Below Details To Get Started
          </p>
        </div>
        <form>
          <div className="flex flex-col gap-3">
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className="py-3 px-4 pl-11 block  shadow-sm border text-md"
                placeholder="you@gmail.com"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-primary">
                <span className="fa-solid fa-envelope"></span>
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                id="fname"
                name="fname"
                className="py-3 px-4 pl-11 block  shadow-sm border text-md"
                placeholder="First Name"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-primary">
                <span className="fa-solid fa-user"></span>
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                id="lname"
                name="lname"
                className="py-3 px-4 pl-11 block shadow-sm border text-md"
                placeholder="Last Name"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-primary">
                <span className="fa-solid fa-user"></span>
              </div>
            </div>
            <div className="relative">
              <input
                type="number"
                id="contact"
                name="contact"
                className="py-3 px-4 pl-11 block  shadow-sm border text-md"
                placeholder="Contact No."
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-primary">
                <span className="fa-solid fa-phone"></span>
              </div>
            </div>
            <div className="flex gap-5">
              <label for="gender">Gender:</label>
              <div class="flex items-center">
                <input
                  id="Male"
                  type="radio"
                  value="Male"
                  name="gender"
                  class="w-4 h-4"
                />
                <label
                  for="Male"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Male
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="Female"
                  type="radio"
                  value="Female"
                  name="gender"
                  class="w-4 h-4"
                />
                <label
                  for="Female"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Female
                </label>
              </div>
            </div>
            <div>
              <button className="px-8 py-2.5 rounded-full bg-primary text-white">
                SIGNUP
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
