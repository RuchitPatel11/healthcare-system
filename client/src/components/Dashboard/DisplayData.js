import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import PrimaryHeading from "../PrimaryHeading";
import CardInfo from "./CardInfo";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";

import SearchFilter from "./SearchFilter";

const DisplayData = () => {
  const [res, setRes] = useState();
  const [fetching, setFetching] = useState(true);
  const pages = () => {
    if (res)
      return Array.from(
        { length: Math.ceil(res.count / res.limit) },
        (_, i) => i + 1
      );
  };
  // const [state, setState] = useState("idle");

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
        setRes(res.data);
      })
      .catch((error) => {
        setRes([]);
        console.log(error);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [auth.token, role]);

  const approveUsers = (id) => {
    axios
      .put(`${process.env.REACT_APP_PATH_NAME}/user/approve/${id}`, undefined, {
        headers: { authorization: auth.token },
      })
      .then((res) => {
        getUsers();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

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

        {res &&
          res.users.map((item) => {
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
                  {item.isApproved === false && (
                    <button
                      className="px-3 text-white rounded-md bg-success"
                      onClick={() => {
                        approveUsers(item._id);
                      }}
                    >
                      Approve {item.role}
                    </button>
                  )}
                  <div className="flex gap-3">
                    <EditUserModal details={item} onUpdate={getUsers} />
                    <DeleteUserModal details={item} onDelete={getUsers} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div>
        Page
        {pages() &&
          pages().map((page) => {
            return (
              <div className="flex">
                <div className="p-3 text-lg">
                  <a href="#" key={page}>
                    {page}
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DisplayData;
