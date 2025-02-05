import {
  Box,
  Button,
  FormControl,
  Input,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { TaskStatus, NewTask } from "../types/task";
import { Project } from "../types/project";
import { useTheme } from "@mui/material/styles";
import ProjectSelector from "./ProjectSelector";
import DueDatePicker from "./DueDatePicker";

const TaskForm = ({
  task,
  setTask,
  projects,
  handleAddTask,
  isTaskValid,
}: {
  task: NewTask;
  setTask: React.Dispatch<React.SetStateAction<NewTask>>;
  projects: Project[];
  handleAddTask: () => void;
  isTaskValid: boolean;
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "20rem",
        gap: "1rem",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: theme.palette.background.paper,
        padding: "1rem",
        borderRadius: "10px",
      }}
    >
      <Input
        placeholder="Task title"
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        sx={{ width: "100%" }}
      />
      <Input
        placeholder="Task Description (Optional)"
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        sx={{ width: "100%" }}
      />
      <FormControl fullWidth>
        <Typography fontWeight={600} fontSize="14px">
          Status
        </Typography>
        <Select
          value={task.status}
          onChange={(e) =>
            setTask({ ...task, status: e.target.value as TaskStatus })
          }
        >
          <MenuItem value={TaskStatus.TODO}>To Do</MenuItem>
          <MenuItem value={TaskStatus.IN_PROGRESS}>In Progress</MenuItem>
          <MenuItem value={TaskStatus.DONE}>Done</MenuItem>
        </Select>
      </FormControl>
      <ProjectSelector task={task} setTask={setTask} projects={projects} />
      <DueDatePicker task={task} setTask={setTask} />
      <Button
        variant="contained"
        sx={{ backgroundColor: theme.palette.primary.main }}
        onClick={handleAddTask}
        disabled={!isTaskValid}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;
