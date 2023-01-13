import React from "react";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import FormField from "../Register/FormField";

const passwordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .trim()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password should be at least 8 Characters long",
      "string.pattern.base":
        "Password Should contain at least 1 Capital letter & 1 Special character ",
    }),
  confirmPassword: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

const CreatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: joiResolver(passwordSchema),
  });
  const { dispatch } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/user/create-password", data);
      if (res.status === 200) {
        dispatch({ type: "loggedIn", payload: res.data });
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-10 p-10 shadow-xl">
      {/* <div className="text-4xl text-secondary">Create Password</div> */}

      <div className="flex items-center justify-center gap-16">
        <div className="p-6">
          <img src="images/create-password.jpg" alt="create-password.jpg" />
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <FormField
                type="password"
                placeholder="Enter Password"
                error={errors.password}
                register={register("password")}
                name="password"
                icon="fa-solid fa-key"
              />
              <FormField
                type="password"
                placeholder="Enter Password"
                error={errors.confirmPassword}
                register={register("confirmPassword")}
                name="confirmPassword"
                icon="fa-solid fa-lock"
              />

              <div className="flex justify-center">
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
