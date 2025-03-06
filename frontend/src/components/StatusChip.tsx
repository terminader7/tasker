import { styled } from "@mui/material";
import MuiChip from "@mui/material/Chip";

interface StatusChipProps {
  label: string;
  [key: string]: any;
}

const Chip = styled(MuiChip)(
  ({ theme }) => `
  color: ${theme.palette.primary.contrastText};
  display: inline-flex;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  align-items: center;
  height: auto;
  justify-content: center;
  padding: ${theme.spacing(0.25, 0)};
  border-radius: 4px;
  cursor: default;

  &.draft {
    background: ${theme.palette.warning.main};
    color: ${theme.palette.warning.contrastText};
  }

  &.active {
    background: ${theme.palette.common.white};
    color: ${theme.palette.success.main};
    border: 1px solid;
    border-color: ${theme.palette.success.main}
  }

  &.completed {
    background: ${theme.palette.success.dark};
    color: ${theme.palette.success.contrastText};
  }

  &.paused {
    background: ${theme.palette.info.main};
    color: ${theme.palette.info.contrastText};
  }

  &.canceled {
    background: ${theme.palette.error.main};
    color: ${theme.palette.error.contrastText};
  }

  &.pending {
    background: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
  }

  &.closed {
    background: ${theme.palette.grey[300]};
    color: ${theme.palette.grey[500]};
    border: 1px solid;
    border-color: ${theme.palette.grey[500]}
  }
`
);

const StatusChip = ({ label, ...props }: StatusChipProps) => {
  const labelText = label?.replaceAll("_", " "); // Converts status to human-readable form

  return (
    <Chip
      variant="filled"
      label={labelText}
      className={label?.toLowerCase()}
      {...props}
    />
  );
};

export default StatusChip;
