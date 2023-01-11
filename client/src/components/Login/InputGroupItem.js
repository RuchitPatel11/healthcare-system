import React from "react";

const InputGroupItem = ({ type, id, name, placeholder, icon }) => {
  return (
    <div class="relative">
      <input
        type={type || "text"}
        id={id}
        name={name}
        class="py-3 px-4 pl-11 block w-full shadow-sm border text-md"
        placeholder={placeholder}
      />
      <div class="absolute inset-y-0 left-0 flex items-center pl-4 text-primary">
        <span class={icon}></span>
      </div>
    </div>
  );
};

export default InputGroupItem;
