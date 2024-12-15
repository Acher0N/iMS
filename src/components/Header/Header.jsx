import "./Header.scss";
import { Logo } from "../Logo";
import { Box, Button } from "@mui/material";
import { toggleMode, toggleLang } from "../../redux/reducers/Theme.reducer";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const { mode, direction } = useSelector((state) => state.theme);
  return (
    <Box className="header bg_glass">
      <Box className="header__logo">
        <Logo />
      </Box>
      <Box className="header__middle">Header</Box>
      <Box className="header__end">
        <Button onClick={() => dispatch(toggleMode())}>{mode === "light" ? "Dark" : "Light"}</Button>
        <Button onClick={() => dispatch(toggleLang())}>{direction === "ltr" ? "العربية" : "English"}</Button>
      </Box>
    </Box>
  );
};

export default Header;
