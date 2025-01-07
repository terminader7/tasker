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
        borderRadius: "5px",
        gap: "1rem",
        backgroundColor: theme.palette.common.white,
        padding: "1rem",
        width: "100%",
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
        {!showUpdateForm && (
          <Button
            sx={{
              color: "primary.contrastText",
              backgroundColor: "secondary.main",
              position: "fixed",
              alignSelf: "flex-end",
            }}
            onClick={() => {
              setShowUpdateForm(true);
            }}
          >
            Update
          </Button>
        )}
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
