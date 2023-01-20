import React, { useState } from "react";

import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import APIButton from "./APIButton";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";

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

  // const updateUsers = (id) => {
  //   axios
  //     .put(`http://localhost:4000/user/update/${id}`, {
  //       headers: { authorization: auth.token },
  //     })
  //     .then((res) => {
  //       setUsers(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="flex flex-col flex-1 mb-5 lg:flex-row">
      <div className="flex flex-col gap-1 p-3 border-r-2 border-dashed lg:w-1/5 border-primary">
        <APIButton
          onClick={(e) => getUsers("Doctor")}
          name="Doctors"
          icon="fa-solid fa-user-doctor"
        />
        <APIButton
          // onClick={getUsers}
          name="Patients"
          icon="fa-solid fa-bed-pulse"
        />
        <APIButton
          onClick={(e) => getUsers("Nurse")}
          name="Nursing Staff"
          icon="fa-solid fa-user-nurse"
        />
        <APIButton
          onClick={(e) => getUsers("Pharmacist")}
          name="Pharmacists"
          icon="fa-solid fa-prescription-bottle-medical"
        />
      </div>
      <div className="grid p-3 lg:grid-cols-4 lg:grid-rows-2 md:grid-cols-2 lg:w-4/5 gap-x-3 gap-y-6">
        {users.map((item) => {
          return (
            <div className="mx-4 bg-white rounded-lg shadow-xl">
              <div className="h-32 rounded-t-lg bg-purple">
                {/* <img
                  className="object-cover object-top w-full"
                  src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                  alt="Mountain"
                /> */}
              </div>
              <div className="relative w-32 h-32 mx-auto -mt-16 overflow-hidden border-4 border-white rounded-full">
                <img
                  className="object-cover object-center h-32"
                  src={`/images/${item.role}.png`}
                  alt="profile.png"
                />
              </div>

              <div className="p-5">
                <div className="flex gap-3">
                  <p className="font-bold">First Name:</p>
                  <p>{item.first_name}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-bold">Last Name:</p>
                  <p>{item.last_name}</p>
                </div>

                <div className="flex gap-2">
                  <p className="font-bold">Email:</p>
                  <p>{item.email}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-bold">Contact No:</p>
                  <p>{item.phoneNo}</p>
                </div>
              </div>
              <div className="flex justify-between p-3 mt-2 border-t">
                <EditUserModal />
                <DeleteUserModal />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
