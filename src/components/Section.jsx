import { useDrop } from "react-dnd";
import toast from "react-hot-toast";
import Header from "./Header";
import Task from "./Task";

export default function Section({
  status,
  tasks,
  setTasks,
  backlogs,
  todos,
  inProgress,
  done,
}) {

  //function available on npm react dnd website
  //tracks and enables dropping dragged tasks 
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id), //on dropping, call addItemToSection
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  //check under what to add the tasks according to their status
  let text = "Backlog";
  let tasksToMap = backlogs;

  if (status === "todo") {
    text = "Todos";
    tasksToMap = todos;
  }

  if (status === "inprogress") {
    text = "In Progress";
    tasksToMap = inProgress;
  }

  if (status === "done") {
    text = "Done";
    tasksToMap = done;
  }

  //when dropped
  const addItemToSection = (id) => {

    //update the list of tasks in app
    setTasks((prev) => {
      const updatedTasks = prev.map((t) => {
        //just change the status of that specific task
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });

      //update the localstorage with updated list of tasks
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      toast("Status of the task is changed!", {
        icon: "🔥",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      return updatedTasks;
    });
  };

  return (
    <div
      ref={drop}
      className={`w-64 rounded-md p-2 bg-slate-500 ${isOver ? "bg-slate-300" : ""}`}
    >
      <Header text={text} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
}
