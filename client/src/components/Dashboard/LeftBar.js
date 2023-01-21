import React from "react";
import APIButton from "./APIButton";

const LeftBar = ({ getUsers }) => {
  return (
    <div className="flex flex-col gap-1">
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
  );
};

export default LeftBar;
