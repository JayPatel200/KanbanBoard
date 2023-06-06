import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from "react-hot-toast";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

function App() {
  //track all the tasks
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    //need atleast 1 task added to avoid errors
    if (JSON.parse(localStorage.getItem("tasks")) === null) {
      localStorage.setItem(
        "tasks",
        JSON.stringify([
          {
            id: "",
            name: "",
            status: "placeholder",
          },
        ])
      );
    }
    //get all the tasks from local storage to persist
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className="bg-sky-500 w-screen flex flex-col items-center p-3 gap-16 pt-32">
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

export default App;
