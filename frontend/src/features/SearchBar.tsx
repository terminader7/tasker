import { Typography } from "@mui/material";
import InlineContainer from "../components/InlineContainer";
import SearchIcon from "@mui/icons-material/SearchRounded";
import IconContainer from "../components/IconContainer";

const SearchBar = () => {
  return (
    <InlineContainer
      sx={{
        borderRadius: "0.5rem",
        cursor: "pointer",
        width: "100%",
        "&:hover": {
          backgroundColor: "primary.light",
          color: "primary.main",
        },
        transition: "0.2s",
      }}
    >
      <IconContainer>
        <SearchIcon fontSize="small" />
      </IconContainer>
      <Typography
        variant="body1"
        fontWeight={500}
        color="inherit"
        sx={{
          width: "100%",
        }}
      >
        Search
      </Typography>
    </InlineContainer>
  );
};

export default SearchBar;
