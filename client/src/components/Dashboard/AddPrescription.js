import React, { useState } from "react";
import PrimaryButton from "../Header/PrimaryButton";
import Loading from "../Loading";
import PrimaryHeading from "../PrimaryHeading";

const AddPrescription = () => {
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState("idle");
  return (
    <div>
      <PrimaryButton
        name="Add New Patient"
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
