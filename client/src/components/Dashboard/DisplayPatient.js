import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import PrimaryButton from "../Header/PrimaryButton";
import PrimaryHeading from "../PrimaryHeading";
import CardInfo from "./CardInfo";
import DeletePatientModal from "./DeletePatientModal";
import EditPatientModal from "./EditPatientModal";

const DisplayPatient = () => {
  const [patients, setPatients] = useState([]);
  const [fetching, setFetching] = useState(true);

  const { auth } = useAuth();

  const getPatients = useCallback(() => {
    setFetching(true);
    axios
      .get(`${process.env.REACT_APP_PATH_NAME}/patient`, {
        headers: { authorization: auth.token },
      })
      .then((res) => {
        setPatients(res.data);
      })
      .catch((error) => {
        setPatients([]);
        console.log(error);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [auth.token]);
  useEffect(() => {
    getPatients();
  }, [getPatients]);

  return (
    <div className="flex flex-col flex-1 mr-20">
      <div className="flex items-center justify-between p-5">
        <PrimaryHeading name="Patients" />
        <PrimaryButton name="Add New Patient" />
      </div>
      <div className="relative grid p-3 lg:grid-cols-2 lg:grid-rows-2 md:grid-cols-1 gap-x-3 gap-y-6">
        {fetching && (
          <div className="absolute inset-0 z-50 flex items-center justify-center text-3xl bg-white ">
            <span className="fa-solid fa-spinner fa-spin-pulse"></span>
          </div>
        )}

        {patients.map((item) => {
          return (
            <div
              className="mx-4 bg-white rounded-lg shadow-xl"
              key={item.updatedAt}
            >
              <div className="h-32 overflow-hidden bg-gray-300 rounded-t-lg "></div>
              <div className="relative w-32 h-32 mx-auto -mt-16 overflow-hidden border-8 border-white rounded-full">
                <img
                  className="object-cover object-center h-32 bg-purple"
                  src={`/images/Patient.png`}
                  alt="profile.png"
                />
              </div>

              <div className="flex justify-between p-3 mx-5">
                <div className="flex flex-col gap-2">
                  <CardInfo label="Name:" value={item.name} />
                  <CardInfo label="Age:" value={item.age} />
                  <CardInfo label="Height:" value={item.height} />
                  <CardInfo label="Weight:" value={item.weight} />
                  <CardInfo label="Gender:" value={item.gender} />
                  <CardInfo label="Email:" value={item.email} />
                  <CardInfo label="Contact No:" value={item.phoneNo} />
                </div>
                <div className="flex flex-col gap-2">
                  <CardInfo label="Address:" value={item.address} />
                  <CardInfo
                    label="Body Temperature:"
                    value={item.temperature}
                  />
                  <CardInfo
                    label="Blood-Pressure:"
                    value={item.bloodPressure}
                  />
                  <CardInfo label="Blood-Group:" value={item.bloodGroup} />
                  <CardInfo label="Sugar-Level:" value={item.sugarLevel} />
                  <CardInfo label="Status:" value={item.status} />
                </div>
              </div>
              <div className="flex justify-between p-3 mt-2 border-t">
                <EditPatientModal details={item} onUpdate={getPatients} />
                <DeletePatientModal details={item} onDelete={getPatients} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayPatient;
