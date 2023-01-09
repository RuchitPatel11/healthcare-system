import { Link } from "react-router-dom";
import NavbarBottom from "./Navbar/NavbarBottom";

const Login = () => {
  return (
    <div>
      <NavbarBottom />
      <div className="flex justify-center items-center min-h-screen relative">
        <img
          src="/images/login-page-bg.png"
          className="absolute top-0 left-0 -z-10 w-full h-full object-fill"
          alt="login-bg"
        />
        <div className="flex gap-16 bg-white shadow-xl p-28">
          <div>
            <img src="images/login-bg.png" alt="login-bg.png" />
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <h1 className="flex gap-1 font-semibold mb-3">
                New User?
                <Link to="/signup">
                  <p className="text-md text-blue-600 font-medium">Sign Up</p>
                </Link>
              </h1>
              <h1 className="font-extrabold text-4xl text-purple">
                Welcome Back!
              </h1>
              <h1 className="text-mute text-lg">Login to continue</h1>
            </div>
            <div>
              <form>
                <div className="flex flex-col gap-3">
                  <div class="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      class="py-3 px-4 pl-11 block w-full shadow-sm border text-md"
                      placeholder="you@gmail.com"
                    />
                    <div class="absolute inset-y-0 left-0 flex items-center pl-4 text-primary">
                      <span class="fa-solid fa-envelope"></span>
                    </div>
                  </div>
                  <div class="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      class="py-3 px-4 pl-11 block w-full shadow-sm  text-md border"
                      placeholder="Enter Password"
                    />
                    <div class="absolute inset-y-0 left-0 flex items-center pl-4 text-primary">
                      <span class="fa-solid fa-lock"></span>
                    </div>
                  </div>
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
                <a href="/" className="text-mute">
                  FORGOT PASSWORD ?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
