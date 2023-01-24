import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PrimaryHeading from "../PrimaryHeading";
import FormField from "../Register/FormField";
import PrimaryButton from "../Header/PrimaryButton";
const addPatientSchema = Joi.object({
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
  height: Joi.string(),
  weight: Joi.string(),
  // .pattern(/^[0-9]+$/)
  gender: Joi.string().valid("Male", "Female").required().messages({
    "any.only": "Gender is Required",
  }),
  email: Joi.string(),

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
  temperature: Joi.string(),
  bloodPressure: Joi.string()
    .pattern(/^\d{1,3}\/\d{1,3}$/)
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
  sugarLevel: Joi.string(),

  status: Joi.string()
    .valid("Under Treatment", "Registering Phase", "Treatment Complete")
    .required()
    .messages({
      "any.only": "Status is Required",
    }),
});

const AddPatientModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [state] = useState("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(addPatientSchema),
    mode: "all",
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <PrimaryButton
        name="Add New Patient"
        onClick={() => {
          setShowModal(true);
        }}
      />

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative w-auto ">
            <div className="relative flex flex-col w-full bg-white rounded-lg shadow-lg ">
              <div className="flex justify-end p-3 rounded-t ">
                <button onClick={() => setShowModal(false)}>
                  <span className="text-2xl fa-solid fa-xmark"></span>
                </button>
              </div>

              <div className="relative flex flex-col p-3 text-center">
                {state === "idle" && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4 px-10">
                      <PrimaryHeading name="Add Patient" />
                      <div className="flex gap-6">
                        <div className="flex flex-col gap-3">
                          <FormField
                            type="text"
                            error={errors.name}
                            register={register("name")}
                            placeholder="Patient Name"
                            name="name"
                            icon="fa-solid fa-bed-pulse"
                          />
                          <FormField
                            type="text"
                            error={errors.age}
                            label="Age :"
                            register={register("age")}
                            placeholder="Age"
                            name="age"
                            // icon="fa-solid fa-bed-pulse"
                          />
                          <FormField
                            type="text"
                            error={errors.height}
                            label="Height :"
                            register={register("height")}
                            placeholder="Height"
                            name="height"
                            // icon="fa-solid fa-bed-pulse"
                          />
                          <FormField
                            type="text"
                            error={errors.weight}
                            label="Weight :"
                            register={register("weight")}
                            placeholder="Weight"
                            name="weight"
                            // icon="fa-solid fa-bed-pulse"
                          />
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
                          <FormField
                            type="text"
                            error={errors.address}
                            register={register("address")}
                            placeholder="Address"
                            name="address"
                            icon="fa-solid fa-home"
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <FormField
                            type="text"
                            error={errors.temperature}
                            label="Body Temperature :"
                            register={register("temperature")}
                            placeholder="Body Temperature"
                            name="temperature"
                            icon="fa-solid fa-temperature-high"
                          />

                          <FormField
                            type="text"
                            label="Blood Pressure :"
                            error={errors.bloodPressure}
                            register={register("bloodPressure")}
                            placeholder="Blood Pressure"
                            name="bloodPressure"
                            // icon="fa-solid fa-home"
                          />
                          <FormField
                            type="text"
                            label="Sugar Level :"
                            error={errors.sugarLevel}
                            register={register("sugarLevel")}
                            placeholder="Sugar Level"
                            name="sugarLevel"
                            // icon="fa-solid fa-home"
                          />

                          <div>
                            <div>
                              <label
                                htmlFor="bloodGroup"
                                className="text-primary"
                              >
                                Blood Group:
                              </label>
                              <select
                                id="bloodGroup"
                                className="border w-full p-2.5 bg-white"
                                defaultValue={"DEFAULT"}
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
                              <label htmlFor="status" className="text-primary">
                                Patient Status:
                              </label>
                              <select
                                id="status"
                                className="border w-full p-2.5 bg-white"
                                defaultValue={"DEFAULT"}
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
                          <button type="submit" className="my-8">
                            Submit
                          </button>
                        </div>
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

export default AddPatientModal;
