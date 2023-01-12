import React from "react";

const FirstSection = () => {
  return (
    <div className="flex justify-between mx-24 gap-28">
      <div className="flex flex-col gap-10 p-24 shadow-xl">
        <h1 className="font-sans text-5xl tracking-wide text-purple">
          "Good Health Saves Money & Bad Health Cost More"
        </h1>
        <p className="text-xl text-mute">
          Hospital Management System is a system enabling hospitals to manage
          information and data related to all aspects of healthcare processes,
          providers, patients, and more, which in turn ensures that processes
          are completed effectively.
        </p>
      </div>
      <div>
        <img
          src="images/home-bg.png"
          alt="Section-1.bg"
          className="transition duration-500 hover:scale-110"
        />
      </div>
    </div>
  );
};

export default FirstSection;