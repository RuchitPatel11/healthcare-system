import React from "react";

const Input = () => {
  return (
    <div className="flex">
      <input type="radio" name="account" id="doctor" className="" />
      <label htmlFor="doctor" className="">
        <img src="images/doctor.png" alt="Doctor" />
      </label>

      <input type="radio" name="account" id="nurse" className="" />
      <label htmlFor="nurse">
        <img src="images/nurse.png" alt="Nurse" />
      </label>
    </div>
  );
};

export default Input;
