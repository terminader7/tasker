import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface TaskCreatorButtonProps extends ButtonProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskCreatorButton: React.FC<TaskCreatorButtonProps> = ({
  showForm,
  setShowForm,
  ...props
}) => (
  <Button variant="contained" onClick={() => setShowForm(!showForm)} {...props}>
    {showForm ? "Close Form" : "Add Task"}
  </Button>
);

export default TaskCreatorButton;
