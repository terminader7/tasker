import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Task } from "../types/task";

const UpdateTaskForm = ({
  task,
  onUpdate,
}: {
  task: Task;
  onUpdate: (updatedTask: Partial<Task>) => void;
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
      <TextField
        label="Due Date"
        value={updatedTask.dueDate}
        onChange={(e) => handleInputChange("dueDate", e.target.value)}
      />

      <Button
        sx={{
          color: "primary.contrastText",
          backgroundColor: "secondary.main",
        }}
        onClick={handleSubmit}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default UpdateTaskForm;
