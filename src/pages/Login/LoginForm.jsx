import React, { useState, useCallback } from "react";
import { Box, Typography, Button, TextField, InputAdornment } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { PersonRounded, KeySharp, VisibilitySharp, VisibilityOffSharp } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { Logo } from "../../components/Logo";
import { memo } from "react";
import "./LoginForm.scss"; // Import the CSS file

const initial_values = {
  user_name: "",
  user_pass: "",
};

const login_schema = Yup.object().shape({
  user_name: Yup.string().required("Username ID is required"),
  user_pass: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

const LoginForm = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const isEng = theme.direction === "ltr";
  const colors = theme.palette;

  const handleSubmit = useCallback((values) => {
    console.log(values);
    toast.info("Login successful!");
  }, []);

  console.log(theme);

  return (
    <Box
      className={`login__form`}
      sx={{
        borderRadius: 1,
        p: 2,
        // bgcolor: colors.background.paper,
        backdropFilter: "blur(40px) ",
        backgroundColor: "transparent",
        position: "absolute",
        overflow: "hidden",
        borderRadius: "15px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -10%)",
      }}
    >
      <Box className="login__form__header">
        <Logo />
        <Typography variant="h6" className="login__form__title">
          {isEng ? "Enter your credentials" : "ادخل اسم المستخدم وكلمة المرور"}
        </Typography>
      </Box>
      <Formik initialValues={initial_values} validationSchema={login_schema} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange }) => (
          <Form className="login__form__container">
            <Box className="login__form__input">
              <TextField
                name="user_name"
                label={isEng ? "Username" : "اسم المستخدم"}
                type="text"
                autoComplete="off"
                value={values.user_name}
                onChange={handleChange}
                error={Boolean(errors.user_name && touched.user_name)}
                helperText={touched.user_name && errors.user_name}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonRounded />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box className="login__form__input">
              <TextField
                name="user_pass"
                label={isEng ? "Password" : "كلمة المرور"}
                type={showPassword ? "text" : "password"}
                value={values.user_pass}
                autoComplete="off"
                onChange={handleChange}
                error={Boolean(errors.user_pass && touched.user_pass)}
                helperText={touched.user_pass && errors.user_pass}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeySharp />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {showPassword ? (
                          <VisibilitySharp onClick={() => setShowPassword(false)} />
                        ) : (
                          <VisibilityOffSharp onClick={() => setShowPassword(true)} />
                        )}
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box className="login__form__input">
              <Button type="submit" variant="text" color="primary" fullWidth>
                {isEng ? "Login" : "تسجيل الدخول"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default memo(LoginForm);
