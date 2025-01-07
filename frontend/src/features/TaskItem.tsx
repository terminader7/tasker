import Box from "@mui/material/Box";
import { Button, IconButton, Typography } from "@mui/material";
import { Task } from "../types/task";
import { useTheme } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { updateTask } from "../api/taskService";
import UpdateTaskForm from "./UpdateTaskForm";

const TaskItem = ({ task, onDelete }: { task: Task; onDelete: () => void }) => {
  const theme = useTheme();
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleUpdate = async (updatedData: Partial<Task>) => {
    try {
      await updateTask(task.id, updatedData);
      setShowUpdateForm(false);
    } catch (error) {
      console.error("Error updating Task", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "15rem",
        height: "15rem",
        border: "2px solid",
        borderRadius: "5px",
        flexDirection: "column",
        gap: "1rem",
        backgroundColor: theme.palette.common.white,
      }}
    >
      <IconButton
        sx={{
          alignSelf: "flex-end",
          posiiton: "fixed",
        }}
        onClick={onDelete}
      >
        <ClearIcon />
      </IconButton>
      <Typography fontWeight={600}>{task.title}</Typography>
      <Typography variant="body1">{task.status}</Typography>
      {task.description && (
        <Typography variant="body1">{task.description}</Typography>
      )}
      {task.dueDate && (
        <Typography
          variant="body2"
          sx={{ color: "secondary.main", fontWeight: 600 }}
        >
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </Typography>
      )}
      {task.createdAt && (
        <Typography
          variant="body2"
          sx={{ color: "secondary.main", fontWeight: 600 }}
        >
          Created on: {new Date(task.createdAt).toLocaleDateString()}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            color: "primary.contrastText",
            backgroundColor: "secondary.main",
            position: "absolute",
            bottom: 15,
          }}
          onClick={() => {
            setShowUpdateForm(true);
          }}
        >
          Update
        </Button>
      </Box>
      {showUpdateForm && (
        <UpdateTaskForm
          task={task}
          onUpdate={handleUpdate}
          setShowUpdateForm={setShowUpdateForm}
        />
      )}
    </Box>
  );
};

export default TaskItem;
