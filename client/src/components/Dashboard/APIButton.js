import React from "react";

const APIButton = ({ name, icon, ...rest }) => {
  return (
    <button
      {...rest}
      className="flex items-center w-full gap-2 p-5 text-xl transition duration-500 rounded hover:bg-secondary hover:text-white bg-slate-100 hover:translate-x-3 text-secondary"
    >
      <span className={icon}></span>
      <h1>{name}</h1>
    </button>
  );
};

export default APIButton;
