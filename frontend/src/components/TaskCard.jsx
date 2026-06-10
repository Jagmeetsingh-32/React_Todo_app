import { useState } from "react";
import api from "../api/axios";

export default function TaskCard({
  task,
  fetchTasks,
}) {

  const [editing, setEditing] =
    useState(false);

  const [title, setTitle] =
    useState(task.title);

  const [description,
    setDescription] =
    useState(task.description);

  const deleteTask = async () => {
    try {

      await api.delete(
        `/tasks/${task._id}`
      );

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  const toggleStatus = async () => {
    try {

      await api.patch(
        `/tasks/${task._id}/status`
      );

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async () => {
    try {

      await api.put(
        `/tasks/${task._id}`,
        {
          title,
          description,
        }
      );

      setEditing(false);

      fetchTasks();

      alert(
        "Task Updated Successfully"
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Update Failed"
      );
    }
  };

  return (
    <div className="border p-4 rounded mb-3 shadow">

      {editing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="border p-2 w-full mb-2 rounded"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="border p-2 w-full mb-2 rounded"
          />

          <button
            onClick={updateTask}
            className="bg-green-500 text-white px-3 py-1 rounded mr-2"
          >
            Save
          </button>

          <button
            onClick={() =>
              setEditing(false)
            }
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3 className="font-bold text-lg">
            {task.title}
          </h3>

          <p className="mb-2">
            {task.description}
          </p>

          <p
            className={
              task.status ===
              "Completed"
                ? "text-green-500 font-semibold"
                : "text-yellow-500 font-semibold"
            }
          >
            {task.status}
          </p>

          <div className="mt-3 flex gap-2">

            <button
              onClick={
                toggleStatus
              }
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              {task.status ===
              "Pending"
                ? "Complete"
                : "Pending"}
            </button>

            <button
              onClick={() =>
                setEditing(true)
              }
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>

            <button
              onClick={deleteTask}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>

          </div>
        </>
      )}

    </div>
  );
}