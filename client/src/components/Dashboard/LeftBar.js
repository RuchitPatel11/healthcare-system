import React from "react";
import APIButton from "./APIButton";

const LeftBar = () => {
  return (
    <div className="flex flex-col gap-1">
      <APIButton
        to="/dashboard/Doctor"
        name="Doctors"
        icon="fa-solid fa-user-doctor"
      />
      <APIButton to={"Patient"} name="Patients" icon="fa-solid fa-bed-pulse" />
      <APIButton
        to={"Nurse"}
        name="Nursing Staff"
        icon="fa-solid fa-user-nurse"
      />
      <APIButton
        to={"Pharmacist"}
        name="Pharmacists"
        icon="fa-solid fa-prescription-bottle-medical"
      />
    </div>
  );
};

export default LeftBar;
