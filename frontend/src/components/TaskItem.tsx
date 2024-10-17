import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const TaskItem = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "15rem",
        border: "2px solid",
        borderRadius: "5px",
        justifyContent: "center",
      }}
    >
      <Typography>Hello</Typography>
    </Box>
  );
};

export default TaskItem;
