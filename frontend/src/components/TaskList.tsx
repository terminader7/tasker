import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TaskItem from "./TaskItem";

const TaskList = () => {
  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <ListItem
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <TaskItem />
      </ListItem>
    </List>
  );
};

export default TaskList;
