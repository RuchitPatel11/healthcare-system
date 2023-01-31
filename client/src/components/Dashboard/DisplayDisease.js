import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import PrimaryHeading from "../PrimaryHeading";

import CardInfo from "./CardInfo";
import DeleteDiseaseModal from "./DeleteDiseaseModal";

import EditDiseaseModal from "./EditDiseaseModal";

import SearchFilter from "./SearchFilter";

const DisplayDisease = () => {
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
  const getDiseases = useCallback(() => {
    setFetching(true);
    axios
      .get(`${process.env.REACT_APP_PATH_NAME}/disease`, {
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
    getDiseases();
  }, [getDiseases]);

  return (
    <div className="flex flex-col flex-1 mr-20">
      <div className="flex items-center justify-between p-5">
        <PrimaryHeading name="Diseases" />
        <div className="flex items-center gap-4">
          <SearchFilter onChange={setSearch} />
          {/* <AddPatientModal onAdd={getPatients} /> */}
        </div>
      </div>
      <div className="relative grid flex-1 grid-cols-3 grid-rows-3 gap-3 p-3">
        {fetching && (
          <div className="absolute inset-0 z-50 flex items-center justify-center text-3xl bg-white ">
            <span className="fa-solid fa-hurricane fa-spin"></span>
          </div>
        )}

        {res &&
          res.diseases.map((item) => {
            return (
              <div
                className="mx-4 duration-700 rounded-lg shadow-md bg-slate-50/75 hover:shadow-purple "
                key={item.updatedAt}
              >
                <div className="p-3">
                  <CardInfo label="Name:" value={item.name} />
                  <CardInfo label="Causes:" value={item.causes} />
                  <CardInfo label="Treatment:" value={item.treatment} />
                </div>
                <div className="flex justify-end p-3">
                  <div className="flex gap-3">
                    <EditDiseaseModal details={item} onUpdate={getDiseases} />
                    <DeleteDiseaseModal details={item} onDelete={getDiseases} />
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
              <option value="5">5 Cards</option>
              <option value="10">10 Cards</option>
              <option value="15">15 Cards</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayDisease;
