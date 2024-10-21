import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const TaskItem = ({ text }: { text: string }) => {
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
      <Typography>{text}</Typography>
    </Box>
  );
};

export default TaskItem;
