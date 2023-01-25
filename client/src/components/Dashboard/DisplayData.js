import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import PrimaryHeading from "../PrimaryHeading";
import CardInfo from "./CardInfo";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";
import Pagination from "./Pagination";
import SearchFilter from "./SearchFilter";

const DisplayData = () => {
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(true);
  const { role } = useParams();
  const { auth } = useAuth();

  const getUsers = useCallback(() => {
    setFetching(true);
    axios
      .get(`${process.env.REACT_APP_PATH_NAME}/user`, {
        headers: { authorization: auth.token },
        params: { role },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        setUsers([]);
        console.log(error);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [auth.token, role]);
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <div className="flex flex-col flex-1 mr-20">
      <div className="flex items-center justify-between p-5">
        <PrimaryHeading name={`${role}s`}></PrimaryHeading>
        <SearchFilter />
      </div>
      <div className="relative grid p-3 lg:grid-cols-4 lg:grid-rows-2 md:grid-cols-2 gap-x-3 gap-y-6">
        {fetching && (
          <div className="absolute inset-0 z-50 flex items-center justify-center text-3xl bg-white ">
            <span className="fa-solid fa-spinner fa-spin-pulse"></span>
          </div>
        )}

        {users.map((item) => {
          return (
            <div
              className="mx-4 duration-700 bg-white rounded-lg shadow-xl hover:shadow-purple"
              key={item.updatedAt}
            >
              <div className="h-32 overflow-hidden bg-gray-300 rounded-t-lg "></div>
              <div className="relative w-32 h-32 mx-auto -mt-16 overflow-hidden border-8 border-white rounded-full">
                <img
                  className="object-cover object-center h-32 bg-purple"
                  src={`/images/${item.role}.png`}
                  alt="profile.png"
                />
              </div>

              <div className="gap-2 p-4 columns-1">
                <CardInfo label="First Name:" value={item.first_name} />
                <CardInfo label="Last Name:" value={item.last_name} />
                <CardInfo label="Email:" value={item.email} />
                <CardInfo label="Contact No:" value={item.phoneNo} />
                <CardInfo label="Gender:" value={item.gender} />
              </div>
              <div className="flex justify-between p-3 mt-2 border-t">
                <EditUserModal details={item} onUpdate={getUsers} />
                <DeleteUserModal details={item} onDelete={getUsers} />
              </div>
            </div>
          );
        })}
      </div>
      <Pagination />
    </div>
  );
};

export default DisplayData;
