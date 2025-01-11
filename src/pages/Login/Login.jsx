// src/pages/Login/Login.jsx
import React, { lazy, Suspense } from "react";
import "./Login.scss";
import { Box } from "@mui/material";
import user from "../../assets/user.png";
import stats from "../../assets/stats.png";

const LoginForm = lazy(() => import("./LoginForm"));

const Login = () => {
  return (
    <Box className="login">
      <Box className="login__content">
        <Box className="login__content__img login__content__img__stats">
          <img width={"320px"} src={stats} alt="" />
        </Box>
        <Box className="login__content__img login__content__img__user">
          <img width={"290px"} src={user} alt="" />
        </Box>
      </Box>
      <Box>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </Box>
    </Box>
  );
};

export default Login;
