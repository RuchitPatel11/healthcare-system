import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../Logo";
import CardInfo from "./CardInfo";
import DeletePrescriptionModal from "./DeletePrescriptionModal";
import EditPrescriptionModal from "./EditPrescriptionModal";
import LineHeading from "./LineHeading";

const ViewPrescription = ({ detail, onAction }) => {
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
        className="flex items-center gap-2 p-2 text-white rounded-md bg-secondary whitespace-nowrap"
        onClick={() => {
          setShowModal(true);
          getPrescription(detail);
        }}
      >
        <span className="fa-regular fa-eye"></span>View Prescription
      </button>
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="container relative bg-white rounded-lg shadow-lg min-h-[24rem] max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 z-50 flex items-center justify-between p-5 bg-white border-b-2 rounded-t border-secondary ">
              <h1 className="text-3xl font-bold font-prata-style text-secondary">
                Healthcare Management
              </h1>
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
              <div className="relative flex flex-col gap-5 px-4">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between px-4">
                    <div className="flex-1 text-center">
                      <div className="">
                        <Logo />
                      </div>
                    </div>
                    <div className="whitespace-nowrap">
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
                      <CardInfo
                        label="Date:"
                        value={new Date(
                          prescription.createdAt
                        ).toLocaleDateString()}
                      />
                    </div>
                  </div>
                  <LineHeading name="Patient Details" />
                  <div className="px-6 py-3 columns-2">
                    {/* {JSON.stringify(prescription)} */}
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
                  <LineHeading name="Disease" />
                  <div className="grid grid-cols-3 gap-4 p-4 ">
                    {prescription.diseases.map((item) => {
                      return (
                        <div
                          key={item.name}
                          className="px-4 py-2 border rounded-lg"
                        >
                          <CardInfo label="Disease Name:" value={item.name} />
                          <CardInfo label="Causes:" value={item.causes} />
                          <CardInfo label="Treatment:" value={item.treatment} />
                        </div>
                      );
                    })}
                  </div>

                  <LineHeading name="Medicine" />
                  <div className="grid grid-cols-3 gap-4 p-4">
                    {prescription.medicines.map((item) => {
                      return (
                        <div
                          key={item.name}
                          className="px-4 py-2 border rounded-lg"
                        >
                          <CardInfo label="Medicine Name:" value={item.name} />
                          <CardInfo label="Dosage:" value={item.dosage} />
                          <CardInfo
                            label="Manufactured By:"
                            value={item.mfgBy}
                          />
                          <CardInfo
                            label="Side Effects:"
                            value={item.sideEffects}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <LineHeading name="Notes" />
                  <div className="p-4">
                    <div className="p-4 bg-slate-200">
                      <p className="">{prescription.notes}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 p-5 ">
                    <EditPrescriptionModal
                      details={prescription._id}
                      onUpdate={getPrescription}
                    />
                    <DeletePrescriptionModal
                      details={prescription._id}
                      onAction={onAction}
                    />
                  </div>
                </div>
              </div>
            )}

            {state === "error" && (
              <div className="px-24 font-bold text-center py-14">
                <h1 className="text-3xl text-red-600">
                  Prescription Does Not Exist
                </h1>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ViewPrescription;
