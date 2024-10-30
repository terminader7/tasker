import Box from "@mui/material/Box";
import { IconButton, Typography } from "@mui/material";
import { Task } from "../types/task";
import { useTheme } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";

const TaskItem = ({ task, onDelete }: { task: Task; onDelete: () => void }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        width: "15rem",
        border: "2px solid",
        borderRadius: "5px",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <IconButton
        sx={{
          alignSelf: "flex-end",
        }}
        onClick={onDelete}
      >
        <ClearIcon />
      </IconButton>
      <Typography fontWeight={600}>{task.title}</Typography>
      {task.description && (
        <Typography variant="body1">{task.description}</Typography>
      )}
      {task.dueDate && (
        <Typography variant="body2">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </Typography>
      )}
    </Box>
  );
};

export default TaskItem;
