import React, { useState } from "react";
import PrimaryButton from "../Header/PrimaryButton";
import Loading from "../Loading";
import PrimaryHeading from "../PrimaryHeading";
import { read, utils } from "xlsx";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

const AddMedicineModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState("idle");
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const onSubmit = async (form) => {
    try {
      setState("submitting");
      const wb = read(await form.file[0].arrayBuffer());
      console.log(wb);
      const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      console.log(data);
      //   const res = await axios.post(
      //     `${process.env.REACT_APP_PATH_NAME}/medicine`,
      //     data,
      //     {
      //       headers: { authorization: auth.token },
      //     }
      //   );
      //   if (res.status === 200) {
      //     reset();
      //     setState("success");
      //   }
    } catch (error) {
      console.error(error);
      //   alert(error.response.data);
      //   setState("error");
    }
  };
  return (
    <div>
      <PrimaryButton
        name="Add New Medicine"
        onClick={() => {
          setShowModal(true);
        }}
      />
      {showModal && (
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

              <div className="relative p-3 text-center">
                {state === "idle" && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3 px-16">
                      <div className="p-2 mb-8">
                        <PrimaryHeading name="Add Medicine" />
                      </div>
                      <label>
                        <input
                          type="file"
                          className="file:border-0 file:mr-7 file:py-2 file:px-6 file:rounded-full file:text-secondary hover:file:cursor-pointer hover:file:text-purple"
                          {...register("file", {
                            required: "Please choose file to upload.",
                          })}
                        />
                      </label>
                      {errors.file && (
                        <span className="flex items-center gap-2 text-red-600">
                          <span className="fa-solid fa-circle-exclamation"></span>
                          {errors.file.message}
                        </span>
                      )}

                      <div className="my-5">
                        <button
                          type="submit"
                          className="px-8 py-2.5 rounded-full bg-primary text-white"
                        >
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMedicineModal;
