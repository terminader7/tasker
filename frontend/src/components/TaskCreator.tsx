import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const TaskCreator = () => {
  const theme = useTheme();
  return (
    <Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: theme.palette.primary.main,
        }}
      >
        Create Task
      </Button>
    </Box>
  );
};

export default TaskCreator;
