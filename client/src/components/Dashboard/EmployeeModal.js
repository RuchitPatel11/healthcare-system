import React from "react";

const EmployeeModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 ">
      <div className="relative w-auto max-w-3xl ">
        <div className="relative flex flex-col w-full bg-white rounded-lg shadow-lg ">
          <div className="flex justify-end p-3 rounded-t ">
            <button>
              <span className="text-2xl fa-solid fa-xmark"></span>
            </button>
          </div>

          <div className="relative flex flex-col gap-5 p-3 text-center"></div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
