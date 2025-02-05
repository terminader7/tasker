import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import InlineContainer from "../components/InlineContainer";
import { Task, TaskStatus } from "../types/task";

const UpdateTaskForm = ({
  task,
  onUpdate,
  setShowUpdateForm,
}: {
  task: Task;
  onUpdate: (updatedTask: Partial<Task>) => void;
  setShowUpdateForm: any;
}) => {
  const [updatedTask, setUpdatedTask] = useState<Partial<Task>>({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
  });

  const handleInputChange = (field: keyof Task, value: string) => {
    setUpdatedTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onUpdate(updatedTask);
  };

  return (
    <Box>
      <TextField
        label="Title"
        value={updatedTask.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
      />
      <TextField
        label="Description"
        value={updatedTask.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
      />
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={updatedTask.status}
          onChange={(e) => handleInputChange("status", e.target.value)}
        >
          <MenuItem value={TaskStatus.TODO}>To Do</MenuItem>
          <MenuItem value={TaskStatus.IN_PROGRESS}>In Progress</MenuItem>
          <MenuItem value={TaskStatus.DONE}>Done</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Due Date"
        value={updatedTask.dueDate}
        onChange={(e) => handleInputChange("dueDate", e.target.value)}
      />
      <InlineContainer>
        <Button
          sx={{
            color: "primary.contrastText",
            backgroundColor: "secondary.main",
          }}
          onClick={() => {
            setShowUpdateForm(false);
          }}
        >
          Cancel
        </Button>
        <Button
          sx={{
            color: "primary.contrastText",
            backgroundColor: "primary.main",
          }}
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </InlineContainer>
    </Box>
  );
};

export default UpdateTaskForm;
