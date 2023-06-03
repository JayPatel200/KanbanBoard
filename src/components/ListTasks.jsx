import { useEffect, useState } from "react";
import Section from "./Section";

export default function ListTasks({ tasks, setTasks }) {
  const [backlogs, setBacklogs] = useState([]);
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    //classify all the tasks according to their status
    const fBacklogs = tasks.filter((task) => task.status === "backlog");
    const fTodos = tasks.filter((task) => task.status === "todo");
    const fInProgress = tasks.filter((task) => task.status === "inprogress");
    const fDone = tasks.filter((task) => task.status === "done");

    //save them respectively in the app state
    setBacklogs(fBacklogs);
    setTodos(fTodos);
    setInProgress(fInProgress);
    setDone(fDone);
  }, [tasks]);

  //used to create the following columns(sections)
  const statuses = ["backlog", "todo", "inprogress", "done"];

  return (
    <div className="flex gap-16">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          backlogs={backlogs}
          todos={todos}
          inProgress={inProgress}
          done={done}
        />
      ))}
    </div>
  );
}