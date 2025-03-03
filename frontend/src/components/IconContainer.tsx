import { Icon, IconProps } from "@mui/material";

const IconContainer = ({ children, sx, ...props }: IconProps) => {
  return (
    <Icon
      sx={{
        display: "flex",
        alignItems: "center",
        verticalAlign: "middle",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Icon>
  );
};

export default IconContainer;
