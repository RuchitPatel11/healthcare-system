import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../Loading";
import PrimaryHeading from "../PrimaryHeading";
import FormField from "../Register/FormField";

const updatePrescriptionSchema = Joi.object({
  _id: Joi.string().hex().length(24).required(),

  diseases: Joi.array().items(Joi.string()).required().min(1).messages({
    "array.min": "Disease is required",
    "any.required": "Disease is required",
  }),
  medicines: Joi.array().items(Joi.string()).required().min(1).messages({
    "array.min": "Medicine is required",
    "array.base": "Medicine is required",
  }),
  notes: Joi.string().allow(""),
  prescribedBy: Joi.string().hex().length(24).required().messages({
    "any.required": "Doctor Name is required",
  }),
});

const EditPrescriptionModal = ({ details, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState("idle");
  const { auth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(updatePrescriptionSchema),
    mode: "all",
    defaultValues: {
      name: details.name,
      dosage: details.dosage.split(" ")[0],
      mfgBy: details.mfgBy,
      sideEffects: details.sideEffects,
    },
  });

  const updatePrescriptions = async (data) => {
    try {
      setState("submitting");
      const id = data._id;
      delete data._id;
      data.dosage = `${data.dosage} mg`;
      await axios.put(
        `http://localhost:4000/prescription/update/${id}`,
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
                    <div>Prescription Updated Successfully</div>
                  </div>
                )}
                {state === "idle" && (
                  <form onSubmit={handleSubmit(updatePrescriptions)}>
                    <div className="flex flex-col gap-5 px-10">
                      <PrimaryHeading name="Update Prescription" />
                      <div className="flex flex-col gap-4">
                        <input
                          type="hidden"
                          defaultValue={details._id}
                          {...register("_id")}
                        />

                        <FormField
                          type="text"
                          error={errors.name}
                          register={register("name")}
                          placeholder="Prescription Name"
                          name="name"
                          icon="fa-solid fa-capsules"
                        />
                        <FormField
                          type="number"
                          error={errors.dosage}
                          label="Dosage (in mg):"
                          register={register("dosage")}
                          placeholder="Dosage in mg"
                          name="dosage"
                          icon="fa-solid fa-syringe"
                        />

                        <FormField
                          type="text"
                          error={errors.mfgBy}
                          label="Manufactured By:"
                          register={register("mfgBy")}
                          placeholder="Manufacturer"
                          name="mfgBy"
                          icon="fa-solid fa-mortar-pestle"
                        />
                        <FormField
                          type="text"
                          error={errors.sideEffects}
                          label="Side Effects:"
                          register={register("sideEffects")}
                          placeholder="Side Effects"
                          name="sideEffects"
                          icon="fa-solid fa-lungs-virus"
                        />

                        <div className="flex gap-5 my-5">
                          <div>
                            <button
                              className="px-6 py-2 text-sm font-bold text-white rounded-md bg-secondary"
                              type="submit"
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
                    </div>
                  </form>
                )}
                {state === "error" && (
                  <div className="flex justify-center gap-2 py-16 text-3xl font-medium text-red-700 first-line:items-center px-28">
                    <span className="fa-solid fa-circle-exclamation "></span>
                    <div>Error while updating Prescription</div>
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

export default EditPrescriptionModal;
