import "./Login.scss";
import { Box } from "@mui/material";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <Box className="login">
      <Box></Box>
      <Box>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
