import { Collapse, Typography, TextField, Box } from "@mui/material";
import InlineContainer from "../components/InlineContainer";
import SearchIcon from "@mui/icons-material/SearchRounded";
import IconContainer from "../components/IconContainer";
import { useContext, useState } from "react";
import { ProjectContext } from "../contexts/projectContext";

const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { searchQuery, setSearchQuery } = useContext(ProjectContext);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
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
        onClick={() => {
          setShowSearch(!showSearch);
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
      <Collapse in={showSearch} timeout="auto" unmountOnExit>
        <TextField
          placeholder="Search..."
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: "common.white",
            borderRadius: "10px",
          }}
          value={searchQuery}
          onInput={(e) => {
            setSearchQuery((e.target as HTMLInputElement).value);
          }}
        ></TextField>
      </Collapse>
    </Box>
  );
};

export default SearchBar;
