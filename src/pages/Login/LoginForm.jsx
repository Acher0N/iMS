// import "./Login.scss";
import { Box } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, TextField, InputAdornment } from "@mui/material";
import { PersonRounded, KeySharp, VisibilitySharp, VisibilityOffSharp } from "@mui/icons-material";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";

const LoginForm = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const isEng = theme.direction === "ltr";
  const initial_values = {
    user_name: "",
    user_pass: "",
  };

  // Define the Sales schema for validation
  const login_schema = Yup.object().shape({
    user_name: Yup.string().required(isEng ? "Username ID is required" : "مطلوب معرف اسم المستخدم"),
    user_pass: Yup.string()
      .min(8, isEng ? "Password must be at least 8 characters" : "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
      .required(isEng ? "Password is required" : "كلمة المرور مطلوبة"),
  });

  function handleSubmit(values) {
    console.log(values);
    toast.info("Login successful!");
  }

  return (
    <Box className="login__form bg_glass">
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
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {isEng ? "Login" : "تسجيل الدخول"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
