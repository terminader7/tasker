import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Task } from "../types/task";
import { useTheme } from "@mui/material/styles";

const TaskItem = ({ task }: { task: Task }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        width: "15rem",
        border: "2px solid",
        borderRadius: "5px",
        justifyContent: "center",
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Typography color="black">{task.title}</Typography>
      {task.description && <Typography>{task.description}</Typography>}
    </Box>
  );
};

export default TaskItem;
