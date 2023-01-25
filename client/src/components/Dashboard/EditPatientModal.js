import React from "react";

const EditPatientModal = () => {
  return (
    <div>
      <button
        className="px-2 py-1 bg-gray-200 rounded-full"
        type="button"
        // onClick={() => {
        //   setShowModal(true);
        // }}
      >
        <span className="text-yellow-500 fa-solid fa-pencil"></span>
      </button>
    </div>
  );
};

export default EditPatientModal;
