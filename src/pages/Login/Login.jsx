import "./Login.scss";
import { Box } from "@mui/material";
import LoginForm from "./LoginForm";
import user from "../../Assets/user.png";
import stats from "../../Assets/stats.png";

const Login = () => {
  return (
    <Box className="login">
      <Box className="login__content">
        <Box className="login__content__img login__content__img__stats">
          <img width={"390px"} src={stats} alt="" />
        </Box>
        <Box className="login__content__img login__content__img__user">
          <img width={"350px"} src={user} alt="" />
        </Box>
      </Box>
      <Box>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
