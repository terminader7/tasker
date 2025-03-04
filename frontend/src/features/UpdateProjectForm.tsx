import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import InlineContainer from "../components/InlineContainer";
import { Project } from "../types/project";
import IconContainer from "../components/IconContainer";
import CloseIcon from "@mui/icons-material/BlindsClosed";

const UpdateProjectForm = ({
  project,
  handleUpdate,
  setShowUpdateForm,
}: {
  project: Project;
  handleUpdate: (id: Project["id"], updatedData: Partial<Project>) => void;
  setShowUpdateForm: any;
}) => {
  const [updatedProject, setupdatedProject] = useState<Partial<Project>>({
    title: project.title,
    description: project.description,
    isPinned: project.isPinned,
    isClosed: project.isClosed,
  });

  const handleInputChange = (field: keyof Project, value: string) => {
    setupdatedProject((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    handleUpdate(project.id, updatedProject);
    setShowUpdateForm(false);
  };

  return (
    <Box>
      <TextField
        label="Title"
        value={updatedProject.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
      />
      <TextField
        label="Description"
        value={updatedProject.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: "secondary.main",
        }}
        onClick={() =>
          handleUpdate(project.id, { isClosed: !project.isClosed })
        }
      >
        <IconContainer>
          <CloseIcon fontSize="small" />
        </IconContainer>
        {project?.isClosed ? "Open Project" : "Close Project"}
      </Button>
      <InlineContainer>
        <Button
          variant="outlined"
          sx={{
            borderColor: "secondary.main",
            color: "secondary.main",
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

export default UpdateProjectForm;
