import { Box, IconButton, Input } from "@mui/material";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { createTask } from "../api/taskService";
import ClearIcon from "@mui/icons-material/Clear";
import { TaskStatus, NewTask } from "../types/task";

const TaskCreator = () => {
  const theme = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState<NewTask>({
    title: "",
    description: "",
    dueDate: "",
    status: TaskStatus.TODO,
  });

  const handleAddTask = async () => {
    try {
      await createTask(task);
      setTask({
        title: "",
        description: "",
        dueDate: "",
        status: TaskStatus.TODO,
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {showForm && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "20rem",
            gap: "1rem",
          }}
        >
          <IconButton
            sx={{
              alignSelf: "flex-end",
            }}
            onClick={() => setShowForm(!showForm)}
          >
            <ClearIcon />
          </IconButton>
          <Input
            placeholder="Task title"
            onChange={(e) => {
              setTask({ ...task, title: e.target.value });
            }}
          />
          <Input
            placeholder="Task Description"
            onChange={(e) => {
              setTask({ ...task, description: e.target.value });
            }}
          />
          <Input
            placeholder="Due Date"
            onChange={(e) => {
              setTask({ ...task, dueDate: e.target.value });
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
            }}
            onClick={handleAddTask}
          >
            Add Task
          </Button>
        </Box>
      )}
      {!showForm && (
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
          }}
          onClick={() => setShowForm(!showForm)}
        >
          Create Task
        </Button>
      )}
    </Box>
  );
};

export default TaskCreator;
