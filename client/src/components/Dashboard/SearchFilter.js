import React from "react";

const SearchFilter = () => {
  return (
    <div className="relative flex items-center justify-end text-lg border-2 text-secondary border-secondary">
      <input
        type="search"
        id="search"
        name="search"
        className="block w-full px-4 py-1.5 shadow-sm pl-11 text-md focus:outline-none"
        placeholder="Quick Search....."
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-4">
        <span className="fa-solid fa-magnifying-glass"></span>
      </div>
    </div>
  );
};

export default SearchFilter;
