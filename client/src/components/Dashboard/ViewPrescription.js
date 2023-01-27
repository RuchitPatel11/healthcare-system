import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../Logo";
import CardInfo from "./CardInfo";
import LineHeading from "./LineHeading";

const ViewPrescription = ({ detail }) => {
  const { auth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState();
  const [prescription, setPrescription] = useState({});
  const getPrescription = (id) => {
    setState("fetching");
    axios
      .get(`${process.env.REACT_APP_PATH_NAME}/prescription/${id}`, {
        headers: { authorization: auth.token },
      })
      .then((res) => {
        setPrescription(res.data);
        setState("success");
      })
      .catch((error) => {
        console.log(error);
        setState("error");
      });
  };

  return (
    <div>
      <button
        className="flex items-center gap-2 p-2 text-white rounded-md bg-secondary"
        onClick={() => {
          setShowModal(true);
          getPrescription(detail);
        }}
      >
        <span className="fa-regular fa-eye"></span>Prescription
      </button>
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="container relative bg-white rounded-lg shadow-lg min-h-[24rem]">
            <div className="flex justify-end p-3 rounded-t ">
              <button onClick={() => setShowModal(false)}>
                <span className="text-2xl fa-solid fa-xmark"></span>
              </button>
            </div>
            {state === "fetching" && (
              <div className="absolute inset-0 flex items-center justify-center text-3xl bg-white">
                <span className="fa-solid fa-hurricane fa-spin"></span>
              </div>
            )}
            {state === "success" && (
              <div className="relative flex flex-col gap-5 p-3 text-center">
                <div className="flex flex-col">
                  <div className="flex items-center p-5 border-b-2 border-dashed border-primary">
                    <div className="w-1/6">
                      <Logo />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold font-prata-style text-secondary">
                        Healthcare Management
                      </h1>
                    </div>
                    <div className="w-1/6">
                      <CardInfo
                        label="Doctor Name:"
                        value={`${prescription.prescribedBy.first_name} ${prescription.prescribedBy.last_name}`}
                      />
                      <CardInfo
                        label="Email:"
                        value={prescription.prescribedBy.email}
                      />
                      <CardInfo
                        label="Contact No:"
                        value={prescription.prescribedBy.phoneNo}
                      />
                    </div>
                  </div>
                  <div className="p-3">
                    {/* {JSON.stringify(prescription)} */}
                    <LineHeading name="Patient Details" />
                    <CardInfo
                      label="Patient Name:"
                      value={prescription.patient.name}
                    />
                    <CardInfo
                      label="Gender:"
                      value={prescription.patient.gender}
                    />
                    <CardInfo
                      label="Temperature:"
                      value={prescription.patient.temperature}
                    />
                    <CardInfo
                      label="Blood Pressure:"
                      value={prescription.patient.bloodPressure}
                    />
                    <CardInfo
                      label="Sugar Level:"
                      value={prescription.patient.sugarLevel}
                    />

                    <CardInfo
                      label="Blood Group:"
                      value={prescription.patient.bloodGroup}
                    />
                  </div>
                  <div className="p-3">
                    <LineHeading name="Disease" />
                    <CardInfo
                      label="Disease Name:"
                      value={prescription.diseases.map((item) => {
                        return <span className="mr-2 ">{item.name}</span>;
                      })}
                    />
                    <CardInfo
                      label="Causes:"
                      value={prescription.diseases.map((item) => {
                        return item.causes.map((item) => {
                          return <span className="mr-2">{item}</span>;
                        });
                      })}
                    />
                    <CardInfo
                      label="Treatment:"
                      value={prescription.diseases.map((item) => {
                        return item.treatment.map((item) => {
                          return <span className="mr-2">{item}</span>;
                        });
                      })}
                    />
                  </div>
                  <div className="p-3">
                    <LineHeading name="Medicine" />
                    {prescription.medicines.map((item) => {
                      return (
                        <div>
                          <CardInfo label="Medicine Name:" value={item.name} />
                          <CardInfo label="Dosage:" value={item.dosage} />
                          <CardInfo
                            label="Manufactured By:"
                            value={item.mfgBy}
                          />
                          <CardInfo
                            label="Side Effects:"
                            value={item.sideEffects.map((item) => {
                              return item;
                            })}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {state === "error" && (
              <div className="flex items-center justify-center px-24 text-3xl font-bold text-red-700 py-14">
                <h1>Prescription Does Not Exist</h1>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ViewPrescription;
