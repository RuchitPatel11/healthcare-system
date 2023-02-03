import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import NoDataFound from "../NoDataFound";
import PrimaryHeading from "../PrimaryHeading";
import CardInfo from "./CardInfo";
import DeleteMedicineModal from "./DeleteMedicineModal";
import EditMedicineModal from "./EditMedicineModal";
import SearchFilter from "./SearchFilter";
import UploadModal from "./UploadModal";

const DisplayMedicine = () => {
  const [res, setRes] = useState();
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const { auth } = useAuth();
  const [state, setState] = useState("idle");

  const pages = () => {
    if (res)
      return Array.from(
        { length: Math.ceil(res.count / res.limit) },
        (_, i) => i + 1
      );
  };
  const getMedicines = useCallback(() => {
    setFetching(true);
    axios
      .get(`${process.env.REACT_APP_PATH_NAME}/medicine`, {
        headers: { authorization: auth.token },
        params: { page, limit, search },
      })
      .then((res) => {
        setRes(res.data);
        setState("idle");
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setState("error");
        }
        setRes(null);
        console.log(error);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [auth.token, page, limit, search]);

  useEffect(() => {
    getMedicines();
  }, [getMedicines]);

  return (
    <div className="flex flex-col flex-1 mr-20">
      <div className="flex items-center justify-between p-5">
        <PrimaryHeading name="Medicines" />
        <div className="flex items-center gap-4">
          <SearchFilter
            onChange={setSearch}
            placeholder="Search for medicine name ..."
          />
          <UploadModal
            onAdd={getMedicines}
            path="/medicine"
            name="Medicine"
            icon="fa-solid fa-capsules"
          />
        </div>
      </div>
      {state === "error" ? (
        <NoDataFound />
      ) : (
        <div className="relative grid flex-1 grid-cols-3 grid-rows-3 gap-3 p-3">
          {fetching && (
            <div className="absolute inset-0 z-50 flex items-center justify-center text-3xl bg-white ">
              <span className="fa-solid fa-hurricane fa-spin"></span>
            </div>
          )}

          {res &&
            res.medicines.map((item) => {
              return (
                <div
                  className="mx-4 duration-700 rounded-lg shadow-md bg-slate-50/75 hover:shadow-purple "
                  key={item._id}
                >
                  <div className="flex justify-between p-2">
                    <div className="w-4/5 text-lg">
                      <CardInfo label="Name:" value={item.name} />
                      <CardInfo label="Dosage:" value={item.dosage} />
                      <CardInfo label="Manufactured By:" value={item.mfgBy} />
                      <CardInfo
                        label="Side Effects:"
                        value={item.sideEffects}
                      />
                    </div>
                    <div className="w-16 h-16 mt-4 rounded-full">
                      <img
                        className="object-contain"
                        src="/images/pills.png"
                        alt="pills.png"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end p-3">
                    <div className="flex gap-3">
                      <EditMedicineModal
                        details={item}
                        onUpdate={getMedicines}
                      />
                      <DeleteMedicineModal
                        details={item}
                        onDelete={getMedicines}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
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
              <option value="9">9 Cards</option>
              <option value="12">12 Cards</option>
              <option value="15">15 Cards</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayMedicine;
