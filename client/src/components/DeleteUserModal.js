import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const DeleteUserModal = ({ details, getUsers }) => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const { auth } = useAuth();

  const deleteUsers = (id) => {
    axios
      .delete(`http://localhost:4000/user/delete/${id}`, {
        headers: { authorization: auth.token },
      })
      .then((res) => {
        setUsers(res.data);
        getUsers(details.role);
      })
      .catch((error) => {
        console.log(error);
      });
    setShowModal(false);
  };

  return (
    <div>
      <button
        className="px-2 py-1 bg-gray-200 rounded-full"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <span className="text-red-600 fa-solid fa-trash"></span>
      </button>
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative w-auto max-w-3xl ">
            <div className="relative flex flex-col w-full bg-white rounded-lg shadow-lg ">
              <div className="flex justify-end p-3 rounded-t ">
                <button onClick={() => setShowModal(false)}>
                  <span className="fa-solid fa-xmark"></span>
                </button>
              </div>
              <div className="relative flex flex-col gap-5 p-3 text-center">
                <div className="flex flex-col gap-6 p-2">
                  <span className="text-4xl text-yellow-500 fa-solid fa-circle-exclamation"></span>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this product?
                  </h3>
                </div>
                <div className="flex justify-center gap-5 p-2">
                  {/* <button
                    className="px-6 py-2 text-sm font-bold text-white bg-red-600 rounded-md"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Yes, I'm sure
                  </button> */}
                  <button
                    className="px-6 py-2 text-sm font-bold text-white bg-red-600 rounded-md"
                    type="button"
                    onClick={(e) => deleteUsers(details._id)}
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    className="px-6 py-2 text-sm font-bold rounded-md text-mute bg-slate-200"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    No,cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DeleteUserModal;
