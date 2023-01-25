import React, { useState } from "react";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import FormField from "../Register/FormField";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../Loading";
import PrimaryHeading from "../PrimaryHeading";

const updateUserSchema = Joi.object({
  _id: Joi.string().hex().length(24).required(),
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

const EditUserModal = ({ details, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState("idle");
  const { auth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(updateUserSchema),
    mode: "all",
  });

  const updateUsers = async (data) => {
    try {
      setState("submitting");
      const id = data._id;
      delete data._id;
      await axios.put(
        `http://localhost:4000/user/update/${id}`,
        { ...data },
        {
          headers: { authorization: auth.token },
        }
      );
      setState("success");
      onUpdate();
    } catch (error) {
      console.log(error);
      setState("error");
    }
  };

  return (
    <div>
      <button
        className="px-2 py-1 bg-gray-200 rounded-full"
        type="button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <span className="text-yellow-500 fa-solid fa-pencil"></span>
      </button>
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 ">
          <div className="relative w-auto max-w-3xl ">
            <div className="relative flex flex-col w-full bg-white rounded-lg shadow-lg ">
              <div className="flex justify-end p-3 rounded-t ">
                <button onClick={() => setShowModal(false)}>
                  <span className="text-2xl fa-solid fa-xmark"></span>
                </button>
              </div>

              <div className="relative flex flex-col gap-5 p-3 text-center">
                {state === "submitting" && (
                  <div className="py-16 px-28">
                    <Loading name="Updating..." size="text-xl"></Loading>
                  </div>
                )}
                {state === "success" && (
                  <div className="flex justify-center gap-2 py-16 text-3xl font-medium first-line:items-center text-success px-28">
                    <span className="fa-solid fa-circle-check "></span>
                    <div>{details.role} Updated Successfully</div>
                  </div>
                )}
                {state === "idle" && (
                  <form onSubmit={handleSubmit(updateUsers)}>
                    <div className="flex flex-col gap-4 px-10">
                      <PrimaryHeading name={`Update ${details.role}`} />
                      <div>
                        <input
                          type="hidden"
                          defaultValue={details._id}
                          {...register("_id")}
                        />
                        <div>
                          <label htmlFor="role" className="text-primary">
                            Choose Account Type:
                          </label>
                          <select
                            id="role"
                            className="border w-full p-2.5 bg-white"
                            defaultValue={details.role}
                            {...register("role")}
                          >
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
                        defaultValue={details.email}
                        register={register("email")}
                        placeholder="you@gmail.com"
                        name="email"
                        icon="fa-solid fa-envelope"
                      />
                      <FormField
                        type="text"
                        error={errors.first_name}
                        defaultValue={details.first_name}
                        register={register("first_name")}
                        placeholder="First Name"
                        name="first_name"
                        icon="fa-solid fa-user"
                      />
                      <FormField
                        type="text"
                        error={errors.last_name}
                        defaultValue={details.last_name}
                        register={register("last_name")}
                        placeholder="Last Name"
                        name="last_name"
                        icon="fa-solid fa-user"
                      />
                      <FormField
                        type="text"
                        error={errors.phoneNo}
                        defaultValue={details.phoneNo}
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
                              defaultChecked={details.gender === "Male"}
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
                              defaultChecked={details.gender === "Female"}
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
                            type="submit"
                            // onClick={(e) => updateUsers(details._id)}
                          >
                            Save
                          </button>
                        </div>
                        <div>
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

export default EditUserModal;
