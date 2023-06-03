import toast from "react-hot-toast";
import { useDrag } from "react-dnd";

export default function Task({ task, tasks, setTasks }) {
    //function available on npm react dnd website
    //specifies what is draggable
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id }, //to track which task is dragged
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  //when cross button is clicked
  const handleRemove = (id) => {
    //removes that specific task from the list
    const fTasks = tasks.filter((t) => t.id !== id);
    //update the localstorage
    localStorage.setItem("tasks", JSON.stringify(fTasks));
    //update the state of the app
    setTasks(fTasks);

    toast("Task removed", {
        icon: "💀",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
  };

  return (
    <div
      ref={drag}
      className={` bg-slate-300 text-lg relative p-4 mt-8 shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <p>{task.name}</p>
      <button
        className="absolute bottom-1 right-1 text-slate-500"
        onClick={() => handleRemove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
}
