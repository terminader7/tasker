import {
  Button,
  Card,
  Collapse,
  LinearProgress,
  Typography,
} from "@mui/material";
import IconContainer from "./IconContainer";
import DeleteIcon from "@mui/icons-material/DeleteForeverRounded";
import { Project } from "../types/project";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { ProjectContext } from "../contexts/projectContext";
import { deleteProject, updateProject } from "../api/projectService";
import PinIcon from "@mui/icons-material/PushPinRounded";
import { Task, TaskStatus } from "../types/task";
import EditIcon from "@mui/icons-material/Edit";
import UpdateProjectForm from "../features/UpdateProjectForm";
import InlineContainer from "./InlineContainer";

const ProjectCard = ({ project }: { project: Project }) => {
  const { projects, setProjects } = useContext(ProjectContext);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdate = async (
    id: Project["id"],
    updatedData: Partial<Project>
  ) => {
    try {
      const updatedProject = await updateProject(id, updatedData);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === id ? { ...project, ...updatedProject } : project
        )
      );
      enqueueSnackbar("Project updated successfully", { variant: "success" });
    } catch (error) {
      console.error("Error updating Task", error);
      enqueueSnackbar("Failed to update task", { variant: "error" });
    }
  };

  const handleDelete = async (id: Project["id"]) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((project) => project.id !== id));
      enqueueSnackbar("Project deleted", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting project", error);
      enqueueSnackbar("Failed to delete project", {
        variant: "error",
      });
    }
  };

  const getProjectTasksCompleted = projects.map((project: Project) => {
    return project.tasks.reduce((taskCompleteCount, task: Task) => {
      return task.status === TaskStatus.DONE
        ? taskCompleteCount + 1
        : taskCompleteCount;
    }, 0);
  });

  const projectTasksCompletedCount = getProjectTasksCompleted[0];

  return (
    <Card
      sx={{
        backgroundColor: "common.white",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "1rem",
      }}
    >
      <InlineContainer
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">{project?.title}</Typography>
        <Button
          variant="outlined"
          sx={{
            color: project.isPinned ? "secondary.main" : "primary.main",
            borderColor: project.isPinned ? "secondary.main" : "primary.main",
          }}
          onClick={() => {
            handleUpdate(project.id, { isPinned: !project.isPinned });
          }}
        >
          <PinIcon fontSize="small" />
          {project.isPinned ? "Unpin" : "Pin"}
        </Button>
      </InlineContainer>
      <LinearProgress
        variant="determinate"
        value={(projectTasksCompletedCount / project.tasks?.length) * 100}
      />
      <Button
        variant="contained"
        sx={{ backgroundColor: "error.main" }}
        onClick={() => handleDelete(project.id)}
      >
        <IconContainer>
          <DeleteIcon fontSize="small" />
        </IconContainer>
        Delete Project
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "primary.main",
        }}
        onClick={() => {
          setShowUpdateForm(!showUpdateForm);
        }}
      >
        <IconContainer>
          <EditIcon fontSize="small" />
        </IconContainer>
        Edit Project
      </Button>
      <Collapse in={showUpdateForm} timeout="auto" unmountOnExit>
        <UpdateProjectForm
          project={project}
          handleUpdate={handleUpdate}
          setShowUpdateForm={setShowUpdateForm}
        />
      </Collapse>
    </Card>
  );
};

export default ProjectCard;
