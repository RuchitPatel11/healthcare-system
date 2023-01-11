import React from "react";

const CreatePassword = () => {
  return (
    <div className="container flex flex-col items-center justify-center gap-10 p-10 shadow-xl">
      {/* <div className="text-4xl text-secondary">Create Password</div> */}

      <div className="flex items-center justify-center gap-16">
        <div className="p-6">
          <img src="images/create-password.jpg" alt="create-password.jpg" />
        </div>
        <div>
          <form>
            <div className="flex flex-col gap-5">
              <div class="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="py-3 px-4 pl-11 block w-full shadow-sm border text-md"
                  placeholder="Password"
                />
                <div class="absolute inset-y-0 left-0 flex items-center pl-4 text-primary">
                  <span class="fa-solid fa-key"></span>
                </div>
              </div>
              <div class="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="py-3 px-4 pl-11 block w-full shadow-sm  text-md border"
                  placeholder="Confirm Password"
                />
                <div class="absolute inset-y-0 left-0 flex items-center pl-4 text-primary">
                  <span class="fa-solid fa-lock"></span>
                </div>
              </div>
              <div class="flex justify-center">
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-full bg-primary text-white"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
