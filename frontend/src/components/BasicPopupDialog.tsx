import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  InputLabel,
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

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// MAKE A UNIVERSAL BASIC DIALOG UTILIZE TYPESCRIPT KEEP IT CENTRALIZED!!!

const ConfirmationDialog = ({ open, onClose }: ConfirmationDialogProps) => {
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
        <Box>
          <Typography>HELLO</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
