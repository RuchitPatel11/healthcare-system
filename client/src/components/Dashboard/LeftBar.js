import React from "react";
import APIButton from "./APIButton";

const LeftBar = () => {
  return (
    <div className="flex flex-col gap-1">
      <APIButton to={"Doctor"} name="Doctors" icon="fa-solid fa-user-doctor" />
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
      <APIButton to={"Medicine"} name="Medicines" icon="fa-solid fa-capsules" />
      <APIButton to={"Disease"} name="Diseases" icon="fa-solid fa-viruses" />
      <APIButton to={"Employee"} name="Employees" icon="fa-solid fa-user" />
    </div>
  );
};

export default LeftBar;
