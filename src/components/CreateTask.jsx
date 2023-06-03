import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

export default function CreateTask({ tasks, setTasks }) {
  //track the task to be added which by default goes to backlog
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "backlog",
  });

  //when create button is clicked
  const handleSubmit = (e) => {
    //prevents from refreshing the page
    e.preventDefault();

    //tasks should be atleast 3 character long
    if (task.name.length < 3) {
      return toast("A task must have more than 3 characters!", {
        icon: "💀",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }

    //if length is acceptable, update tasks(useState) and local storage
    setTasks((prev) => {
      //Do not use tasks instead of prev to avoid unwanted behaviour
      const list = [...prev, task];
      //save the updated list of tasks in localstorage
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });

    toast.success("Task Created!", {
      icon: "🔥",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    //reset the input field
    setTask({
      id: "",
      name: "",
      status: "backlog",
    });
  };

  return (
    <form>
      <input
        type="text"
        className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
        value={task.name}
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), name: e.target.value })
        }
      />
      <button
        className="bg-slate-700 rounded-md px-4 h-12 text-slate-100 hover:bg-slate-600"
        onClick={handleSubmit}
      >
        Create
      </button>
    </form>
  );
}
