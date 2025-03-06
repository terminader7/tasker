import {
  Box,
  Button,
  Card,
  Collapse,
  LinearProgress,
  Typography,
  useTheme,
} from "@mui/material";
import IconContainer from "./IconContainer";
import DeleteIcon from "@mui/icons-material/DeleteForeverRounded";
import { Project } from "../types/project";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { projectContext } from "../contexts/projectContext";
import { deleteProject, updateProject } from "../api/projectService";
import PinIcon from "@mui/icons-material/PushPinRounded";
import { Task, TaskStatus } from "../types/task";
import EditIcon from "@mui/icons-material/Edit";
import UpdateProjectForm from "../features/UpdateProjectForm";
import InlineContainer from "./InlineContainer";
import StatusChip from "./StatusChip";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({
  project,
  showAsList,
}: {
  project: Project;
  showAsList: boolean;
}) => {
  const { projects, setProjects } = useContext(projectContext);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const navigate = useNavigate();

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

  const completedTaskCount = getProjectTasksCompleted[0];

  const handleClick = () => {
    navigate(`/${project.id}`);
  };

  return (
    <Card
      sx={{
        backgroundColor: project.isClosed ? "grey.300" : "common.white",
        display: "flex",
        flexDirection: showAsList ? "row" : "column",
        gap: "2rem",
        padding: theme.spacing(2),
        justifyContent: showAsList ? "space-between" : "center",
        minHeight: showAsList ? "4rem" : "12rem",
        alignItems: showAsList ? "center" : "default",
        position: "relative",
      }}
    >
      <InlineContainer
        sx={{
          justifyContent: "space-between",
          gap: "2rem",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              width: "fit-content",
              ":hover": {
                cursor: "pointer",
                color: "primary.main",
              },
              transition: "0.2s",
            }}
            onClick={handleClick}
          >
            {project?.title}
          </Typography>
          <StatusChip label={project.isClosed ? "closed" : "active"} />
        </Box>
        <Button
          variant="outlined"
          sx={{
            color: project.isPinned ? "secondary.main" : "primary.main",
            borderColor: project.isPinned ? "secondary.main" : "primary.main",
            height: "2rem",
          }}
          onClick={() => {
            handleUpdate(project.id, { isPinned: !project.isPinned });
          }}
          disabled={project.isClosed}
          size="small"
        >
          <PinIcon fontSize="small" />
          {project.isPinned ? "Unpin" : "Pin"}
        </Button>
      </InlineContainer>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Typography variant="body2">Progress</Typography>
        <LinearProgress
          variant="determinate"
          value={
            project?.tasks?.length
              ? (completedTaskCount / project.tasks?.length) * 100
              : 0
          }
        />
      </Box>
      <InlineContainer sx={{ gap: "2rem", justifyContent: "center" }}>
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
          Edit
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "error.main" }}
          onClick={() => handleDelete(project.id)}
        >
          <IconContainer>
            <DeleteIcon fontSize="small" />
          </IconContainer>
          Delete
        </Button>
      </InlineContainer>
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
