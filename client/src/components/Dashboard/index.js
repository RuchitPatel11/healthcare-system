import React, { useState } from "react";

import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";
import LeftBar from "./LeftBar";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const { auth } = useAuth();

  const getUsers = (role) => {
    axios
      .get("http://localhost:4000/user", {
        headers: { authorization: auth.token },
      })
      .then((res) => {
        const data = res.data.filter((user) => user.role === role);
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col flex-1 mb-3 lg:flex-row">
      <div className="p-3 border-r-2 border-dashed lg:w-1/5 border-primary">
        <LeftBar getUsers={getUsers} />
      </div>
      <div className="grid p-3 lg:grid-cols-4 lg:grid-rows-2 md:grid-cols-2 lg:w-4/5 gap-x-3 gap-y-6">
        {users.map((item) => {
          return (
            <div
              className="mx-4 bg-white rounded-lg shadow-xl"
              key={item.updatedAt}
            >
              <div className="h-32 overflow-hidden bg-gray-300 rounded-t-lg "></div>
              <div className="relative w-32 h-32 mx-auto -mt-16 overflow-hidden border-4 border-white rounded-full">
                <img
                  className="object-cover object-center h-32"
                  src={`/images/${item.role}.png`}
                  alt="profile.png"
                />
              </div>

              <div className="flex flex-col gap-2 p-4">
                <div className="flex gap-3">
                  <p className="font-medium">First Name:</p>
                  <p>{item.first_name}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-medium">Last Name:</p>
                  <p>{item.last_name}</p>
                </div>

                <div className="flex gap-2">
                  <p className="font-medium">Email:</p>
                  <p>{item.email}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-medium">Contact No:</p>
                  <p>{item.phoneNo}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-medium">Gender:</p>
                  <p>{item.gender}</p>
                </div>
              </div>
              <div className="flex justify-between p-3 mt-2 border-t">
                <EditUserModal getUsers={getUsers} details={item} />
                <DeleteUserModal getUsers={getUsers} details={item} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
