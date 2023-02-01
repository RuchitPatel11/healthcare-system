import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { TaskForm } from "./AddTask";

const EditTaskModal = ({ detail, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState("idle");
  const { auth } = useAuth();

  const onSubmit = async (data) => {
    try {
      setState("submitting");
      const res = await axios.put(
        `${process.env.REACT_APP_PATH_NAME}/nurse-task/update/${detail._id}`,
        data,
        {
          headers: { authorization: auth.token },
        }
      );

      if (res.status === 200) {
        setState("success");
        onUpdate(detail.patient._id);
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data);
      setState("error");
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        Edit
      </button>
      {showModal && (
        <TaskForm
          detail={detail.patient._id}
          state={state}
          onSubmit={onSubmit}
          onClose={() => {
            setShowModal(false);
          }}
          defaultValues={{
            status: detail.status,
            taskDescription: detail.taskDescription,
            taskTitle: detail.taskTitle,
          }}
        />
      )}
    </div>
  );
};

export default EditTaskModal;
