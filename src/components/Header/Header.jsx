import "./Header.scss";
import { Logo } from "../Logo";
import { Box, Button, useTheme } from "@mui/material";
import { toggleMode, toggleLang } from "../../redux/reducers/Theme.reducer";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { mode, direction } = useSelector((state) => state.theme);
  return (
    <Box className={`${theme.palette.mode === "dark" ? "bg_glass_dark" : "bg_glass_light"} header `}>
      <Box className="header__logo">
        <Logo />
      </Box>
      <Box className="header__middle"></Box>
      <Box className="header__end">
        <Button onClick={() => dispatch(toggleMode())}>{mode === "light" ? "Dark" : "Light"}</Button>
        <Button onClick={() => dispatch(toggleLang())}>{direction === "ltr" ? "العربية" : "English"}</Button>
      </Box>
    </Box>
  );
};

export default Header;
