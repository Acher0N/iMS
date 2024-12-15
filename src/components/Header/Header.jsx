import "./Header.scss";
import { Logo } from "../Logo";
import { Box, Button } from "@mui/material";
import { toggleMode, toggleLang } from "../../redux/reducers/Theme.reducer";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <Box className="header">
      <Box className="header__logo">
        <Logo />
      </Box>
      <Box className="header__middle">Header</Box>
      <Box className="header__end">
        <Button onClick={() => dispatch(toggleMode())}>Theme</Button>
        <Button onClick={() => dispatch(toggleLang())}>Language</Button>
      </Box>
    </Box>
  );
};

export default Header;
