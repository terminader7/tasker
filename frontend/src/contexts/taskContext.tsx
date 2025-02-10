// import React, { createContext, useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { Task } from "../types/task";
// // import { getTasksByProjectId } from "../api/taskService";
// import { ProjectProvider } from "./projectContext";

// export interface ITaskContext {
//   tasks: Task[];
//   setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
// }

// export const TaskContext = createContext<ITaskContext>({
//   tasks: [],
//   setTasks: () => null,
// });

// export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const { project } = useContext(ProjectProvider); // Get the project from context
//   const { projectId } = useParams<{ projectId: string }>();

//   useEffect(() => {
//     const fetchTasks = async () => {
//       if (!projectId) return;
//       try {
//         const data = await getTasksByProjectId(parseInt(projectId));
//         setTasks(data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };
//     fetchTasks();
//   }, [projectId]);

//   return (
//     <TaskContext.Provider value={{ tasks, setTasks }}>
//       {children}
//     </TaskContext.Provider>
//   );
// };
