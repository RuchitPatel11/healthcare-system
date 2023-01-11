import { Link } from "react-router-dom";

const registerSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6).max(16),
});

const Register = () => {
  return (
    <div>
      <div className="container flex flex-col p-10 bg-white shadow-xl">
        <div className="mb-5 text-center">
          <p className="text-xl text-mute">
            Please Fill Out Below Details To Get Started
          </p>
        </div>
        <div className="flex justify-center gap-16">
          <div className="px-20 py-10">
            <form>
              <div className="flex flex-col gap-3">
                <div>
                  <label htmlFor="role" className="text-primary">
                    Choose Account Type:
                  </label>
                  <select id="role" className="border w-full p-2.5 bg-white">
                    <option value="" selected>
                      Select Role
                    </option>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Pharmacist">Pharmacist</option>
                  </select>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="block px-4 py-3 border shadow-sm pl-11 text-md"
                    placeholder="you@gmail.com"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="fa-solid fa-envelope text-primary"></span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    className="block px-4 py-3 border shadow-sm pl-11 text-md"
                    placeholder="First Name"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="fa-solid fa-user text-primary"></span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    className="block px-4 py-3 border shadow-sm pl-11 text-md"
                    placeholder="Last Name"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="fa-solid fa-user text-primary"></span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    id="contact"
                    name="contact"
                    className="block px-4 py-3 border shadow-sm pl-11 text-md"
                    placeholder="Contact No."
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="fa-solid fa-phone text-primary"></span>
                  </div>
                </div>
                <div className="relative flex gap-5 p-4 mt-2 border">
                  <label
                    htmlFor="gender"
                    className="absolute text-lg bg-white -top-4 left-3 text-extrabold text-primary"
                  >
                    Gender:
                  </label>
                  <div class="flex items-center">
                    <input
                      id="Male"
                      type="radio"
                      value="Male"
                      name="gender"
                      class="w-4 h-4 accent-primary"
                    />
                    <label
                      for="Male"
                      class="ml-2 text-md font-medium text-gray-600 dark:text-gray-300"
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
                      class="w-4 h-4 accent-primary"
                    />
                    <label
                      for="Female"
                      class="ml-2 text-md font-medium text-gray-600 dark:text-gray-300"
                    >
                      Female
                    </label>
                  </div>
                </div>
                <div className="my-3">
                  <button className="px-8 py-2.5 rounded-full bg-primary text-white">
                    SIGNUP
                  </button>
                </div>
                <div className="flex gap-1 font-medium text-black">
                  <h1>Already Registered?</h1>
                  <Link to="/login">
                    <p className="text-blue-600 text-md">Login</p>
                  </Link>
                  <p>Now</p>
                </div>
              </div>
            </form>
          </div>
          <div className="my-16">
            <img
              src="images/sign-up.jpg"
              alt="signup.webp"
              className="w-auto transition duration-200 h-96 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
