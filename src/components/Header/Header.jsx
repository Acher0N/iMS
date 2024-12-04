import "./Header.scss";
import { Box } from "@mui/material";
import { Logo } from "../Logo";

const Header = () => {
  return (
    <Box className="header">
      <Box className="header__logo">
        <Logo />
      </Box>
      <Box className="header__middle">Header</Box>
      <Box className="header__end">Tools</Box>
    </Box>
  );
};

export default Header;
