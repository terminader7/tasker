import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import InlineContainer from "../components/InlineContainer";
import { Project } from "../types/project";
import IconContainer from "../components/IconContainer";
import CloseIcon from "@mui/icons-material/Block";

const characterLimit = 250;

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
    isClosed: project.isClosed,
    isPinned: project.isPinned,
  });

  // Work around small use case where user pins project while having the update form open
  useEffect(() => {
    setupdatedProject({
      title: project.title,
      description: project.description,
      isClosed: project.isClosed,
      isPinned: project.isPinned,
    });
  }, [project]);

  const handleInputChange = <K extends keyof Project>(
    field: K,
    value: Project[K]
  ) => {
    setupdatedProject((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (updatedProject.isClosed) {
      updatedProject.isPinned = false;
    }
    handleUpdate(project.id, updatedProject);
    setShowUpdateForm(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <TextField
        label="Title"
        value={updatedProject.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          label="Description"
          value={updatedProject.description}
          multiline
          rows={3}
          onChange={(e) => {
            if (e.target.value.length <= characterLimit) {
              handleInputChange("description", e.target.value);
            }
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color:
              (updatedProject?.description?.length ?? 0) > 200
                ? "error.main"
                : "grey.600",
            display: "block",
            textAlign: "right",
          }}
        >
          {updatedProject?.description?.length ?? 0} / {characterLimit}
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "secondary.main",
        }}
        onClick={() => handleInputChange("isClosed", !updatedProject.isClosed)}
      >
        <IconContainer>
          <CloseIcon fontSize="small" />
        </IconContainer>
        {updatedProject?.isClosed ? "Open Project" : "Close Project"}
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
