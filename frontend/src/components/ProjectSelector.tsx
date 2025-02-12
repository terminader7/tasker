import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { NewTask } from "../types/task";
import { Project } from "../types/project";
import { useParams } from "react-router-dom";

const ProjectSelector = ({
  task,
  setTask,
  projects,
}: {
  task: NewTask;
  setTask: React.Dispatch<React.SetStateAction<NewTask>>;
  projects: Project[];
}) => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <FormControl fullWidth>
      <Typography fontWeight={600} fontSize="14px">
        Project
      </Typography>
      <Select
        value={task.project ? task.project.id : projectId}
        onChange={(e) => {
          const selectedProject = projects.find(
            (project) => project.id === Number(e.target.value)
          );
          if (selectedProject) {
            setTask({ ...task, project: selectedProject });
          }
        }}
      >
        {projects.length
          ? projects.map((project: Project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.title}
              </MenuItem>
            ))
          : null}
      </Select>
    </FormControl>
  );
};

export default ProjectSelector;
