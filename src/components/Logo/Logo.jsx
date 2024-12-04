import { Box } from "@mui/material";
import { LOGO } from "../../Assets";

const Logo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "70px",
        p: "10px",
        gap: "3px",
      }}
    >
      <Box sx={{ minWidth: "25px", width: "25px" }}>
        <img style={{ width: "100%" }} src={LOGO} alt="logo" />
      </Box>
      <Box sx={{ fontWeight: "bold", fontSize: "16px" }}>iMS</Box>
    </Box>
  );
};

export default Logo;
