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
  handleUpdate,
  setShowUpdateForm,
}: {
  task: Task;
  handleUpdate: (id: Task["id"], updatedData: Partial<Task>) => void;
  setShowUpdateForm: any;
}) => {
  const [updatedTask, setUpdatedTask] = useState<Partial<Task>>({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    status: task.status,
    project: task.project,
  });

  const handleInputChange = (field: keyof Task, value: string) => {
    setUpdatedTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    handleUpdate(task.id, updatedTask);
    setShowUpdateForm(false);
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
          variant="outlined"
          sx={{
            color: "secondary.main",
            borderColor: "secondary.main",
          }}
          onClick={() => {
            setShowUpdateForm(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "primary.main",
          }}
          onClick={() => {
            handleSubmit();
            setShowUpdateForm(false);
          }}
        >
          Save Changes
        </Button>
      </InlineContainer>
    </Box>
  );
};

export default UpdateTaskForm;
