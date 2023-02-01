import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import PrimaryHeading from "../PrimaryHeading";
import AddPatientModal from "./AddPatientModal";
import AddPrescription from "./AddPrescription";
import AddTask from "./AddTask";
import CardInfo from "./CardInfo";
import DeletePatientModal from "./DeletePatientModal";
import EditPatientModal from "./EditPatientModal";
import SearchFilter from "./SearchFilter";
import ViewPrescription from "./ViewPrescription";
import ViewTask from "./ViewTask";

const DisplayPatient = () => {
  const [res, setRes] = useState();
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const { auth } = useAuth();

  const pages = () => {
    if (res)
      return Array.from(
        { length: Math.ceil(res.count / res.limit) },
        (_, i) => i + 1
      );
  };
  const getPatients = useCallback(() => {
    setFetching(true);
    axios
      .get(`${process.env.REACT_APP_PATH_NAME}/patient`, {
        headers: { authorization: auth.token },
        params: { page, limit, search },
      })
      .then((res) => {
        setRes(res.data);
      })
      .catch((error) => {
        setRes([]);
        console.log(error);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [auth.token, page, limit, search]);

  useEffect(() => {
    getPatients();
  }, [getPatients]);

  return (
    <div className="flex flex-col flex-1 mr-20">
      <div className="flex items-center justify-between p-5">
        <PrimaryHeading name="Patients" />
        <div className="flex items-center gap-4">
          <SearchFilter onChange={setSearch} />
          <AddPatientModal onAdd={getPatients} />
        </div>
      </div>
      <div className="relative grid flex-1 gap-3 p-3">
        {fetching && (
          <div className="absolute inset-0 z-50 flex items-center justify-center text-3xl bg-white ">
            <span className="fa-solid fa-hurricane fa-spin"></span>
          </div>
        )}

        {res &&
          res.patients.map((item) => {
            return (
              <div
                className="flex mx-4 duration-700 rounded-lg shadow-md bg-slate-50/75 hover:shadow-purple "
                key={item.updatedAt}
              >
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

                <div className="w-5/6 p-3 columns-3">
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
                <div className="flex flex-col items-end justify-between p-3">
                  <div>
                    {item.prescription ? (
                      <ViewPrescription
                        detail={item._id}
                        onAction={getPatients}
                      />
                    ) : (
                      <AddPrescription detail={item._id} onAdd={getPatients} />
                    )}
                    {item.task ? (
                      <ViewTask detail={item._id} onAction={getPatients} />
                    ) : (
                      <AddTask detail={item._id} onAdd={getPatients} />
                    )}
                  </div>
                  <div className="flex gap-3">
                    <EditPatientModal details={item} onUpdate={getPatients} />
                    <DeletePatientModal details={item} onDelete={getPatients} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {pages() && (
        <div className="flex items-center justify-between p-3">
          <div className="flex gap-3">
            <div className="text-lg font-bold text-secondary">
              <h1>Page:</h1>
            </div>

            {pages().map((p) => {
              return (
                <div className="text-lg" key={p}>
                  <button
                    className="px-2 rounded-full bg-slate-300"
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-secondary">Limit:</h1>
            <select
              className="w-full px-3 py-1 bg-white"
              onChange={(e) => {
                setLimit(e.target.value);
              }}
            >
              <option value="4">4 Cards</option>
              <option value="8">8 Cards</option>
              <option value="12">12 Cards</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayPatient;
