import React, { useEffect } from "react";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
// import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import FormField from "../Register/FormField";
import { useParams } from "react-router-dom";

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
  const { token } = useParams();

  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: joiResolver(passwordSchema),
  });
  // const { dispatch } = useAuth();
  // console.log(process.env.REACT_APP_PATH_NAME);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(
          "http://localhost:4000/token/verify?token=" + token
        );
        if (res.status === 200) {
          console.log(res.data);
        }
      } catch (error) {
        console.error(error);
        alert(error.response.data);
      }
    })();
  }, [token]);

  return (
    <div className="container flex flex-col items-center justify-center gap-10 p-10 shadow-xl">
      <div className="flex items-center justify-center gap-16">
        <div className="p-6">
          <img src="/images/create-password.jpg" alt="create-password.jpg" />
        </div>
        <div className="flex flex-col gap-12">
          <div className="flex justify-center">
            <p className="text-3xl font-bold underline text-secondary decoration-4 underline-offset-8 decoration-primary">
              Create Password
            </p>
          </div>
          {/* onSubmit={handleSubmit(onSubmit)} */}
          <form>
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
