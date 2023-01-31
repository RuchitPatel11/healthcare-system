import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../Loading";
import PrimaryHeading from "../PrimaryHeading";
import FormField from "../Register/FormField";
import { useAuth } from "../../hooks/useAuth";
import PrimaryButton from "../Header/PrimaryButton";
import { useParams } from "react-router-dom";
const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.email": "Enter valid email address",
      "string.empty": "Email is required",
    }),
  first_name: Joi.string()
    .required()
    .trim()
    .min(3)
    .max(15)
    .messages({ "string.empty": "First Name is required" })
    .label("First Name"),
  last_name: Joi.string()
    .required()
    .trim()
    .min(3)
    .max(15)
    .messages({ "string.empty": "Last Name is required" })
    .label("Last Name"),
  gender: Joi.string().valid("Male", "Female").required().messages({
    "any.only": "Gender is Required",
  }),
  phoneNo: Joi.string()
    .pattern(/^[6-9]{1}\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Enter valid contact number",
      "string.empty": "Contact No is required",
    }),
});
const AddUserModal = ({ onAdd }) => {
  const [state, setState] = useState("idle");
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();
  const { role } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(registerSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    try {
      setState("submitting");
      const res = await axios.post(
        `${process.env.REACT_APP_PATH_NAME}/user/create-user`,
        { ...data, role },
        {
          headers: { authorization: auth.token },
        }
      );
      if (res.status === 200) {
        reset();
        setState("success");
        onAdd();
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data);
      setState("error");
    }
  };

  return (
    <div>
      <PrimaryButton
        name={`Add New ${role}`}
        onClick={() => {
          setShowModal(true);
        }}
      />
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 ">
          <div className="relative w-auto max-w-3xl ">
            <div className="relative flex flex-col w-full bg-white rounded-lg shadow-lg ">
              <div className="flex justify-end p-3 rounded-t ">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setState("idle");
                  }}
                >
                  <span className="text-2xl fa-solid fa-xmark"></span>
                </button>
              </div>

              <div className="relative flex flex-col gap-5 p-3 text-center">
                {state === "submitting" && (
                  <div className="py-16 px-28">
                    <Loading name="Adding..." size="text-xl"></Loading>
                  </div>
                )}
                {state === "success" && (
                  <div className="flex justify-center gap-2 py-16 text-3xl font-medium first-line:items-center text-success px-28">
                    <span className="fa-solid fa-circle-check "></span>
                    <div>{role} Added !</div>
                  </div>
                )}
                {state === "idle" && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5 px-10">
                      <div className="p-2">
                        <PrimaryHeading name={`Add ${role}`} />
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
                        type="text"
                        error={errors.phoneNo}
                        register={register("phoneNo")}
                        placeholder="Contact No"
                        name="phoneNo"
                        icon="fa-solid fa-phone"
                      />
                      <div>
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
                              {...register("gender")}
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
                              {...register("gender")}
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
                        {errors.gender && (
                          <span className="flex items-center gap-2 m-1 text-red-600">
                            <span className="fa-solid fa-circle-exclamation"></span>
                            {errors.gender.message}
                          </span>
                        )}
                      </div>
                      <div className="my-3">
                        <button
                          type="submit"
                          className="px-8 py-2.5 rounded-full bg-primary text-white"
                        >
                          {state === "submitting" ? (
                            <Loading size={"text-lg"} name="Loading..." />
                          ) : (
                            <span>SUBMIT</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
                {state === "error" && (
                  <div className="flex justify-center gap-2 py-16 text-3xl font-medium text-red-700 first-line:items-center px-28">
                    <span className="fa-solid fa-circle-exclamation "></span>
                    <div>Error while updating record</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddUserModal;
