import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import PrimaryButton from "../Header/PrimaryButton";
import Loading from "../Loading";
import PrimaryHeading from "../PrimaryHeading";

const addPrescriptionSchema = Joi.object({
  patient: Joi.string().hex().length(24).required(),
  diseases: Joi.array().items(Joi.string()).required(),
  // .messages({ "array.min": "Disease is required" }),
  medicines: Joi.array().items(Joi.string()).required(),
  // .messages({ "array.min": "Medicine is required" }),
  notes: Joi.string(),
  prescribedBy: Joi.string().hex().length(24).required(),
});

const AddPrescription = () => {
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState("idle");
  const { auth } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(addPrescriptionSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    try {
      setState("submitting");
      const res = await axios.post(
        `${process.env.REACT_APP_PATH_NAME}/prescription`,
        data,
        {
          headers: { authorization: auth.token },
        }
      );
      if (res.status === 200) {
        reset();
        setState("success");
        // onAdd();
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
        name="Add Prescription"
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
                    <div>Prescription Added !</div>
                  </div>
                )}
                {state === "idle" && (
                  <form>
                    <div className="flex flex-col gap-3">
                      <div className="p-2">
                        <PrimaryHeading name="Add Prescription" />
                      </div>
                      <div>
                        <div>
                          <label htmlFor="diseases" className="text-primary">
                            Choose Disease:
                          </label>
                          <select
                            id="diseases"
                            className="border w-full p-2.5 bg-white"
                            defaultValue={"DEFAULT"}
                            {...register("diseases")}
                          >
                            <option value="DEFAULT" disabled>
                              Select Diseases
                            </option>
                            <option value="Disease">Disease</option>
                          </select>
                        </div>
                        {errors.diseases && (
                          <span className="flex items-center gap-2 m-1 text-red-600">
                            <span className="fa-solid fa-circle-exclamation"></span>
                            {errors.diseases.message}
                          </span>
                        )}
                      </div>
                      <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                          <input
                            id="medicines"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                          />
                        </div>
                        <label
                          for="medicines"
                          className="ml-2 text-md text-secondary"
                        >
                          MEdicine1
                        </label>
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

export default AddPrescription;
