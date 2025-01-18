import { Formik } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button } from "@mui/material";

const validationSchema = Yup.object().shape({
  name: Yup.string().optional(),
  company: Yup.string().required("Company name is required").min(1, "Company name must be at least 1 character"),
  VATNo: Yup.string()
    .required("VAT Number is required")
    .length(14, "VAT Number must be exactly 14 digits")
    .matches(/^\d{14}$/, "VAT Number must contain only digits"),
  phone: Yup.string()
    .required("Phone number is required")
    .length(11, "Phone number must be exactly 11 digits")
    .matches(/^\d{11}$/, "Phone number must contain only digits"),
  email: Yup.string().email("Invalid email address").optional(),
  address: Yup.string().optional(),
});

const CustomerAdd = () => {
  const initialValues = {
    name: "",
    company: "",
    VATNo: "",
    phone: "",
    email: "",
    address: "",
  };

  function handleFormSubmit(values, { setSubmitting, setErrors, setStatus, resetForm }) {
    console.log(values);
    resetForm({});
  }

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={validationSchema}>
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "space-between", height: "100%" }}
        >
          <Box>
            <TextField
              type="text"
              name="name"
              label="Customer Name"
              value={values.name}
              onChange={handleChange}
              error={!!touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
          </Box>

          <Box>
            <TextField
              type="text"
              name="company"
              label="Company Name"
              value={values.company}
              onChange={handleChange}
              error={!!touched.company && !!errors.company}
              helperText={touched.company && errors.company}
              required
            />
          </Box>

          <Box>
            <TextField
              type="number"
              label="VAT Number"
              onChange={handleChange}
              name="VATNo"
              value={values.VATNo}
              error={!!touched.VATNo && !!errors.VATNo}
              helperText={touched.VATNo && errors.VATNo}
              required
            />
          </Box>

          <Box>
            <TextField
              type="tel"
              label="Phone Number"
              onChange={handleChange}
              name="phone"
              value={values.phone}
              error={!!touched.phone && !!errors.phone}
              helperText={touched.phone && errors.phone}
            />
          </Box>

          <Box>
            <TextField
              type="email"
              label="Email"
              onChange={handleChange}
              name="email"
              value={values.email}
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
          </Box>

          <Box>
            <TextField
              label="Address"
              onChange={handleChange}
              name="address"
              value={values.address}
              error={!!touched.address && !!errors.address}
              helperText={touched.address && errors.address}
            />
          </Box>

          <Button type="submit" variant="outlined">
            Add
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default CustomerAdd;
