import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import PrimaryHeading from "../PrimaryHeading";
import AddPatientModal from "./AddPatientModal";
import CardInfo from "./CardInfo";
import DeletePatientModal from "./DeletePatientModal";
import EditPatientModal from "./EditPatientModal";
import SearchFilter from "./SearchFilter";

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
        <div className="flex items-center gap-4">
          <SearchFilter />
          <AddPatientModal onAdd={getPatients} />
        </div>
      </div>
      <div className="relative grid gap-3 p-3">
        {fetching && (
          <div className="absolute inset-0 z-50 flex items-center justify-center text-3xl bg-white ">
            <span className="fa-solid fa-spinner fa-spin-pulse"></span>
          </div>
        )}

        {patients.map((item) => {
          return (
            <div
              className="mx-4 duration-700 rounded-lg shadow-md bg-slate-50/75 hover:shadow-purple "
              key={item.updatedAt}
            >
              <div className="flex ">
                <div className="w-1/6">
                  <div className="relative w-full h-full overflow-hidden bg-gray-300 rounded-tl-lg">
                    <div className="absolute w-32 h-32 overflow-hidden -translate-x-1/2 -translate-y-1/2 border-8 border-white rounded-full top-1/2 left-1/2">
                      <img
                        className="object-cover object-center h-32 bg-purple"
                        src={`/images/Patient.png`}
                        alt="profile.png"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-5/6 p-3 px-5 columns-3">
                  <CardInfo label="Name:" value={item.name} />
                  <CardInfo label="Age:" value={item.age} />
                  <CardInfo label="Height:" value={item.height} />
                  <CardInfo label="Weight:" value={item.weight} />
                  <CardInfo label="Gender:" value={item.gender} />
                  <CardInfo label="Email:" value={item.email} />
                  <CardInfo label="Contact No:" value={item.phoneNo} />
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
                <div className="flex items-end justify-between gap-3 p-3">
                  <EditPatientModal details={item} onUpdate={getPatients} />
                  <DeletePatientModal details={item} onDelete={getPatients} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayPatient;
