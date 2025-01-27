import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Input,
  Button,
} from "@mui/material";
import { forwardRef, useState } from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { NewProject, Project } from "../types/project";
import InlineContainer from "../components/InlineContainer";
import { createProject } from "../api/projectService";
import { useSnackbar } from "notistack";

interface ProjectCreatorProps {
  open: boolean;
  onClose: () => void;
  onProjectCreated: (project: Project) => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectCreator = ({
  open,
  onClose,
  onProjectCreated,
}: ProjectCreatorProps) => {
  const [project, setProject] = useState<NewProject>({
    title: "",
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleAddProject = async () => {
    try {
      const newProject = await createProject(project);
      onProjectCreated(newProject);
      setProject({
        title: "",
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      enqueueSnackbar("Project created!", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Failed to create project", {
        variant: "error",
      });
      console.error("Error creating project", error);
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {}}
    >
      <DialogTitle>Create a new project</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        <Input
          placeholder="Project Name"
          onChange={(e) => setProject({ ...project, title: e.target.value })}
        />
        <Input
          placeholder="Project Description"
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
        />
        <InlineContainer>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddProject}>
            Add Project
          </Button>
        </InlineContainer>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCreator;
