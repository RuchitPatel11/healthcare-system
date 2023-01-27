import React, { useState } from "react";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import FormField from "../Register/FormField";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../Loading";
import PrimaryHeading from "../PrimaryHeading";

const updatePatientSchema = Joi.object({
  _id: Joi.string().hex().length(24).required(),
  name: Joi.string()
    .required()
    .trim()
    .min(3)
    .max(15)
    .messages({ "string.empty": "Name is required" })
    .label("Name"),
  age: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "Age is required" }),
  height: Joi.string()
    .pattern(/^\d{1,2}'\d{1,2}"$/)
    .messages({ "string.pattern.base": "Enter valid height" })
    .allow(""),
  weight: Joi.string().allow(""),
  gender: Joi.string().valid("Male", "Female").required().messages({
    "any.only": "Gender is Required",
  }),
  email: Joi.string().allow(""),
  phoneNo: Joi.string()
    .pattern(/^[6-9]{1}\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Enter valid contact number",
      "string.empty": "Contact No is required",
    }),
  address: Joi.string()
    .required()
    .messages({ "string.empty": "Address is required" }),
  temperature: Joi.string()
    .pattern(/^[1-9]\d*(\.\d+)?$/)
    .messages({
      "string.pattern.base": "Enter valid body temperature",
      "string.empty": "Body Temperature is required",
    }),
  bloodPressure: Joi.string()
    .pattern(/^\d{1,3}\/\d{2,3}$/)
    .messages({
      "string.pattern.base": "Enter valid blood pressure",
      "string.empty": "Blood Pressure is required",
    }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required()
    .messages({
      "any.only": "Blood Group is Required",
    }),
  sugarLevel: Joi.string()
    .pattern(/^\d{1,4}$/)
    .messages({
      "string.pattern.base": "Enter valid sugar level",
    })
    .allow(""),

  status: Joi.string()
    .valid("Under Treatment", "Registering Phase", "Treatment Complete")
    .required()
    .messages({
      "any.only": "Status is Required",
    }),
});

const EditPatientModal = ({ details, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState("idle");
  const { auth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(updatePatientSchema),
    mode: "all",
    defaultValues: {
      name: details.name,
      age: details.age,
      height: details.height,
      weight: details.weight.split(" ")[0],
      email: details.email,
      phoneNo: details.phoneNo,
      temperature: details.temperature.split(" ")[0],
      address: details.address,
      bloodPressure: details.bloodPressure.split(" ")[0],
      sugarLevel: details.sugarLevel.split(" ")[0],
      bloodGroup: details.bloodGroup,
      status: details.status,
    },
  });

  const updatePatients = async (data) => {
    try {
      setState("submitting");
      data.bloodPressure = `${data.bloodPressure} (mmHg)`;
      data.sugarLevel = `${data.sugarLevel} (mg/dL)`;
      data.temperature = `${data.temperature} °F`;
      data.weight = `${data.weight} kg`;
      const id = data._id;
      delete data._id;
      await axios.put(
        `${process.env.REACT_APP_PATH_NAME}/patient/update/${id}`,
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative w-auto ">
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

              <div className="relative flex flex-col p-3 text-center">
                {state === "submitting" && (
                  <div className="py-16 px-28">
                    <Loading name="Updating..." size="text-xl"></Loading>
                  </div>
                )}
                {state === "success" && (
                  <div className="flex justify-center gap-2 py-16 text-3xl font-medium first-line:items-center text-success px-28">
                    <span className="fa-solid fa-circle-check "></span>
                    <div>Patient Updated Successfully!</div>
                  </div>
                )}
                {state === "idle" && (
                  <form onSubmit={handleSubmit(updatePatients)}>
                    <div className="flex flex-col gap-5 px-10">
                      <div className="p-2">
                        <PrimaryHeading name="Update Patient" />
                      </div>
                      <div className="flex gap-12">
                        <div className="flex flex-col gap-5">
                          <input
                            type="hidden"
                            defaultValue={details._id}
                            {...register("_id")}
                          />
                          <FormField
                            type="text"
                            error={errors.name}
                            register={register("name")}
                            placeholder="Patient Name"
                            name="name"
                            icon="fa-solid fa-bed-pulse"
                          />
                          <FormField
                            type="number"
                            error={errors.age}
                            label="Age :"
                            register={register("age")}
                            placeholder="Age"
                            name="age"
                            src="/images/age.png"
                          />
                          <FormField
                            type="text"
                            error={errors.height}
                            label="Height :"
                            register={register("height")}
                            placeholder={`Height Eg:-(5'11")`}
                            name="height"
                            icon="fa-solid fa-ruler"
                          />
                          <FormField
                            type="number"
                            error={errors.weight}
                            label="Weight :"
                            register={register("weight")}
                            placeholder="Weight in kg"
                            name="weight"
                            icon="fa-solid fa-weight-scale"
                          />
                          <FormField
                            type="text"
                            error={errors.email}
                            register={register("email")}
                            placeholder="you@gmail.com"
                            name="email"
                            icon="fa-solid fa-envelope"
                          />
                        </div>
                        <div className="flex flex-col gap-5">
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
                                  defaultChecked={details.gender === "Male"}
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
                          <FormField
                            type="text"
                            error={errors.address}
                            register={register("address")}
                            placeholder="Address"
                            name="address"
                            icon="fa-solid fa-home"
                          />
                          <FormField
                            type="text"
                            error={errors.temperature}
                            label="Body Temperature :"
                            register={register("temperature")}
                            placeholder="Body Temperature in (°F)"
                            name="temperature"
                            icon="fa-solid fa-temperature-high"
                          />

                          <FormField
                            type="text"
                            label="Blood Pressure :"
                            error={errors.bloodPressure}
                            register={register("bloodPressure")}
                            placeholder="Blood Pressure in (mmHg)"
                            name="bloodPressure"
                            icon="fa-solid fa-droplet"
                          />
                        </div>
                        <div className="flex flex-col gap-5">
                          <FormField
                            type="number"
                            label="Sugar Level :"
                            error={errors.sugarLevel}
                            register={register("sugarLevel")}
                            placeholder="Sugar Level in (mg/dL)"
                            name="sugarLevel"
                          />

                          <div>
                            <div>
                              <label
                                htmlFor="bloodGroup"
                                className="flex justify-start mb-1 text-secondary"
                              >
                                Blood Group:
                              </label>
                              <select
                                id="bloodGroup"
                                className="border w-full p-2.5 bg-white"
                                {...register("bloodGroup")}
                              >
                                <option value="DEFAULT" disabled>
                                  Select Blood Group
                                </option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                              </select>
                            </div>
                            {errors.bloodGroup && (
                              <span className="flex items-center gap-2 m-1 text-red-600">
                                <span className="fa-solid fa-circle-exclamation"></span>
                                {errors.bloodGroup.message}
                              </span>
                            )}
                          </div>
                          <div>
                            <div>
                              <label
                                htmlFor="status"
                                className="flex justify-start mb-1 text-secondary"
                              >
                                Patient Status:
                              </label>
                              <select
                                id="status"
                                className="border w-full p-2.5 bg-white"
                                {...register("status")}
                              >
                                <option value="DEFAULT" disabled>
                                  Select Patient Status
                                </option>
                                <option value="Under Treatment">
                                  Under Treatment
                                </option>
                                <option value="Registering Phase">
                                  Registering Phase
                                </option>
                                <option value="Treatment Complete">
                                  Treatment Complete
                                </option>
                              </select>
                            </div>
                            {errors.status && (
                              <span className="flex items-center gap-2 m-1 text-red-600">
                                <span className="fa-solid fa-circle-exclamation"></span>
                                {errors.status.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center my-5">
                        <button
                          type="submit"
                          className=" px-8 py-2.5 rounded-full bg-primary text-white w-96 "
                        >
                          UPDATE
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EditPatientModal;
