import { Button } from "@mui/material";

const TaskCreatorButton = ({
  showForm,
  setShowForm,
}: {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Button variant="contained" onClick={() => setShowForm(!showForm)}>
    {showForm ? "Close Form" : "Create New Task"}
  </Button>
);

export default TaskCreatorButton;
