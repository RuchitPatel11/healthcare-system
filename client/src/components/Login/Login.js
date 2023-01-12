import { Link } from "react-router-dom";
import FormField from "../Register/FormField";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative flex items-center justify-center flex-1">
        <img
          src="/images/login-page-bg.png"
          className="absolute top-0 left-0 object-fill w-full h-full -z-10"
          alt="login-bg"
        />
        <div className="flex gap-16 bg-white shadow-xl p-28 ">
          <div>
            <img
              src="images/login-bg.png"
              alt="login-bg.png"
              className="transition duration-200 shadow-xl hover:scale-110"
            />
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <h1 className="flex gap-1 mb-3 font-semibold">
                New User?
                <Link to="/register">
                  <p className="font-medium text-blue-600 text-md">Sign Up</p>
                </Link>
              </h1>
              <h1 className="text-4xl font-extrabold text-purple">
                Welcome Back!
              </h1>
              <h1 className="text-lg text-mute">Login to continue</h1>
            </div>
            <div>
              <form>
                <div className="flex flex-col gap-3">
                  <FormField
                    type="text"
                    placeholder="you@gmail.com"
                    name="email"
                    icon="fa-solid fa-envelope"
                  />
                  {/* <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="block w-full px-4 py-3 border shadow-sm pl-11 text-md"
                      placeholder="you@gmail.com"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-primary">
                      <span className="fa-solid fa-envelope"></span>
                    </div>
                  </div> */}
                  <FormField
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    icon="fa-solid fa-lock"
                  />
                  {/* <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="block w-full px-4 py-3 border shadow-sm pl-11 text-md"
                      placeholder="Enter Password"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-primary">
                      <span className="fa-solid fa-lock"></span>
                    </div>
                  </div> */}
                </div>
              </form>
            </div>
            <div className="flex items-center gap-10">
              <div>
                <button className="px-8 py-2.5 rounded-full bg-primary text-white">
                  LOGIN
                </button>
              </div>
              <div>
                <Link to="/reset-password">
                  <button className="text-mute">FORGOT PASSWORD ?</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
