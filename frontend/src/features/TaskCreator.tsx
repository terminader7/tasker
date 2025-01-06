import { Box, IconButton, Input } from "@mui/material";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { createTask } from "../api/taskService";
import ClearIcon from "@mui/icons-material/Clear";
import { TaskStatus, NewTask, Task } from "../types/task";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { useSnackbar } from "notistack";

const TaskCreator = ({
  onTaskCreated,
}: {
  onTaskCreated: (task: Task) => void;
}) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState<NewTask>({
    title: "",
    description: "",
    dueDate: null,
    status: TaskStatus.TODO,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const handleAddTask = async () => {
    try {
      const newTask = await createTask(task);
      onTaskCreated(newTask);
      setTask({
        title: "",
        description: "",
        dueDate: null,
        status: TaskStatus.TODO,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setShowForm(false);
      enqueueSnackbar("Task created!", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Failed to create task", {
        variant: "error",
      });
      console.error("Error creating task", error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
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
            <DateTimePicker
              label="Due Date (Optional)"
              value={
                task.dueDate ? DateTime.fromISO(task.dueDate.toString()) : null
              }
              onChange={(date) => {
                setTask({ ...task, dueDate: date ? date.toJSDate() : null });
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
    </LocalizationProvider>
  );
};

export default TaskCreator;
