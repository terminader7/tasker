import {
  Button,
  IconButton,
  Typography,
  Tooltip,
  Collapse,
  Card,
} from "@mui/material";
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
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        backgroundColor: "common.white",
        padding: theme.spacing(2),
      }}
    >
      <InlineContainer sx={{}}>
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
      </InlineContainer>
      <Collapse in={showUpdateForm} timeout="auto" unmountOnExit>
        <UpdateTaskForm
          task={task}
          handleUpdate={handleUpdate}
          setShowUpdateForm={setShowUpdateForm}
        />
      </Collapse>
    </Card>
  );
};

export default TaskItem;
