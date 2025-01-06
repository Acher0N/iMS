import { Box, useTheme, Typography } from "@mui/material";
import { LOGO } from "../../Assets";

const Logo = () => {
  const theme = useTheme();
  const isEng = theme.direction === "ltr";
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "55px",
        p: "0px",
        gap: "3px",
      }}
    >
      <Box sx={{ minWidth: "25px", width: "25px" }}>
        <img style={{ width: "100%" }} src={LOGO} alt="logo" />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px" }}>
        iMS
      </Typography>
    </Box>
  );
};

export default Logo;
