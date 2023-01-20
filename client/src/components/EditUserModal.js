import React, { useState } from "react";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import FormField from "./Register/FormField";

const updateUserSchema = Joi.object({
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
  role: Joi.string()
    .valid("Doctor", "Pharmacist", "Nurse", "Admin")
    .required()
    .messages({
      "any.only": "Role is required",
    }),
});

const EditUserModal = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(updateUserSchema),
    mode: "all",
  });

  return (
    <div>
      <button
        className="px-2 py-1 bg-gray-200 rounded-full"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <span className="text-yellow-500 fa-solid fa-pencil"></span>
      </button>
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative w-auto max-w-3xl ">
            <div className="relative flex flex-col w-full bg-white rounded-lg shadow-lg ">
              <div className="flex p-3 rounded-t">
                <button onClick={() => setShowModal(false)}>
                  <span className="fa-solid fa-xmark"></span>
                </button>
              </div>
              <div className="relative flex flex-col gap-5 p-3 text-center">
                <form>
                  <div className="flex flex-col gap-3 px-10">
                    <h1 className="text-2xl font-extrabold text-secondary">
                      Update User
                    </h1>
                    <div>
                      <div>
                        <label htmlFor="role" className="text-primary">
                          Choose Account Type:
                        </label>
                        <select
                          id="role"
                          className="border w-full p-2.5 bg-white"
                          defaultValue={"DEFAULT"}
                          {...register("role")}
                        >
                          <option value="DEFAULT" disabled>
                            Select Role
                          </option>
                          <option value="Doctor">Doctor</option>
                          <option value="Nurse">Nurse</option>
                          <option value="Pharmacist">Pharmacist</option>
                        </select>
                      </div>
                      {errors.role && (
                        <span className="flex items-center gap-2 m-1 text-red-600">
                          <span className="fa-solid fa-circle-exclamation"></span>
                          {errors.role.message}
                        </span>
                      )}
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
                    <div className="flex gap-5 my-5">
                      <div>
                        <button
                          className="px-6 py-2 text-sm font-bold text-white rounded-md bg-secondary"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Save
                        </button>
                      </div>
                      <div>
                        {" "}
                        <button
                          className="px-6 py-2 text-sm font-bold text-white bg-red-600 rounded-md"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EditUserModal;
