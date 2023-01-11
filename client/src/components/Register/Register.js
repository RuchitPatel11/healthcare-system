import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import FormField from "./FormField";

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.email": "Enter valid email address",
      "string.empty": "Email is required",
    }),
  first_name: Joi.string()
    .required()
    .min(3)
    .max(15)
    .messages({ "string.empty": "First Name is required" })
    .label("First Name"),
  last_name: Joi.string()
    .required()
    .min(3)
    .max(15)
    .messages({ "string.empty": "Last Name is required" })
    .label("Last Name"),
  gender: Joi.string().valid("Male", "Female").required(),
  phoneNo: Joi.string()
    .pattern(/^[6-9]{1}\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Enter valid contact number",
      "string.empty": "Contact No is required",
    }),
  role: Joi.string().valid("Doctor", "Pharmacist", "Nurse", "Admin").required(),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(registerSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3">
                <div>
                  <label htmlFor="role" className="text-primary">
                    Choose Account Type:
                  </label>
                  <select
                    id="role"
                    className="border w-full p-2.5 bg-white"
                    defaultValue={"DEFAULT"}
                  >
                    <option value="DEFAULT" disabled>
                      Select Role
                    </option>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Pharmacist">Pharmacist</option>
                  </select>
                </div>
                <FormField
                  type="text"
                  error={errors.email}
                  register={register("email")}
                  placeholder="you@gmail.com"
                  name="email"
                  icon="fa-solid fa-envelope"
                />
                <FormField
                  type="text"
                  error={errors.first_name}
                  register={register("first_name")}
                  placeholder="First Name"
                  name="first_name"
                  icon="fa-solid fa-user"
                />
                <FormField
                  type="text"
                  error={errors.last_name}
                  register={register("last_name")}
                  placeholder="Last Name"
                  name="last_name"
                  icon="fa-solid fa-user"
                />
                <FormField
                  type="number"
                  error={errors.phoneNo}
                  register={register("phoneNo")}
                  placeholder="Contact No"
                  name="phoneNo"
                  icon="fa-solid fa-phone"
                />
                <div className="relative flex gap-5 p-4 mt-2 border">
                  <label
                    htmlFor="gender"
                    className="absolute text-lg bg-white -top-4 left-3 text-extrabold text-primary"
                  >
                    Gender:
                  </label>
                  <div className="flex items-center">
                    <input
                      id="Male"
                      type="radio"
                      value="Male"
                      name="gender"
                      className="w-4 h-4 accent-primary"
                    />
                    <label
                      htmlFor="Male"
                      className="ml-2 font-medium text-gray-600 text-md dark:text-gray-300"
                    >
                      Male
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="Female"
                      type="radio"
                      value="Female"
                      name="gender"
                      className="w-4 h-4 accent-primary"
                    />
                    <label
                      htmlFor="Female"
                      className="ml-2 font-medium text-gray-600 text-md dark:text-gray-300"
                    >
                      Female
                    </label>
                  </div>
                </div>
                <div className="my-3">
                  <button
                    type="submit"
                    className="px-8 py-2.5 rounded-full bg-primary text-white"
                  >
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
