import { useState } from "react";
import api from "../api/axios";

export default function TaskForm({
  fetchTasks,
}) {

  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const handleSubmit = async () => {

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {

      await api.post("/tasks", {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      fetchTasks();

    } catch (error) {
      console.log(error);
      alert("Failed to create task");
    }
  };

  return (
    <div className="border p-4 rounded">

      <input
        placeholder="Task Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="border p-2 w-full mb-2"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        className="border p-2 w-full mb-2"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-amber-400"
      >
        Add Task
      </button>

    </div>
  );
}