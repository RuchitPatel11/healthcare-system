import React, { useState } from "react";

import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import APIButton from "./APIButton";

const Dashboard = () => {
  const [users, setUsers] = useState();
  const { auth } = useAuth();
  const getUsers = () => {
    axios
      .get("http://localhost:4000/user", {
        headers: { authorization: auth.token },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const user = JSON.stringify(users);
  return (
    <div className="flex flex-1 w-full">
      <div className="flex flex-col w-1/6 gap-1 p-3 border-r-2 border-dashed border-primary">
        <APIButton
          onClick={getUsers}
          name="Doctors"
          icon="fa-solid fa-user-doctor"
        />
        <APIButton
          onClick={getUsers}
          name="Patients"
          icon="fa-solid fa-bed-pulse"
        />
        <APIButton
          onClick={getUsers}
          name="Nursing Staff"
          icon="fa-solid fa-user-nurse"
        />
      </div>
      <div className="w-5/6 p-3 overflow-hidden">{user}</div>
    </div>
  );
};

export default Dashboard;
