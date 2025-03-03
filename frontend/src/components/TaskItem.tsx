import { Button, IconButton, Typography, Tooltip } from "@mui/material";
import { Task } from "../types/task";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/DeleteForeverRounded";
import { useState } from "react";
import UpdateTaskForm from "../features/UpdateTaskForm";
import InlineContainer from "./InlineContainer";

const TaskItem = ({
  task,
  onDelete,
  handleUpdate,
}: {
  task: Task;
  onDelete: () => void;
  handleUpdate: (id: Task["id"], updatedData: Partial<Task>) => void;
}) => {
  const theme = useTheme();
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  return (
    <InlineContainer
      sx={{
        borderRadius: "5px",
        gap: "1rem",
        backgroundColor: theme.palette.common.white,
        padding: "1rem",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Tooltip title="Delete task">
        <IconButton
          sx={{
            alignSelf: "flex-end",
            posiiton: "fixed",
            color: "error.main",
          }}
          onClick={onDelete}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
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
      {!showUpdateForm && (
        <Button
          sx={{
            color: "primary.contrastText",
            backgroundColor: "secondary.main",
            alignSelf: "flex-end",
          }}
          onClick={() => {
            setShowUpdateForm(true);
          }}
        >
          Update
        </Button>
      )}
      {showUpdateForm && (
        <UpdateTaskForm
          task={task}
          handleUpdate={handleUpdate}
          setShowUpdateForm={setShowUpdateForm}
        />
      )}
    </InlineContainer>
  );
};

export default TaskItem;
