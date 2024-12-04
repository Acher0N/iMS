import "./Titlebar.scss";
import useTheme from "@mui/material/styles/useTheme";
import { Search } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
const Titlebar = ({ title }) => {
  const theme = useTheme();
  const colors = theme.palette;
  return (
    <Box className="titlebar" sx={{ backgroundColor: colors.background.paper }}>
      <Box className="titlebar__title">
        <Typography>{title}</Typography>
      </Box>
      <Box className="titlebar__sub">
        <Search />
      </Box>
      <Box className="titlebar__tools">
        <Typography>Profile</Typography>
      </Box>
    </Box>
  );
};

export default Titlebar;
