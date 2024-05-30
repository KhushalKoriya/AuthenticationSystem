import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Typography, Grid } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

const RegistrationForm = ({ userType }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formKey, setFormKey] = useState(0); 

  useEffect(() => {
    setSuccess("");
    setFormKey((prevKey) => prevKey + 1);
  }, [userType]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/register/${userType}`,
        values
      );
      setSuccess(response.data);
      resetForm();
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error.response?.data ||
          "An error occurred during registration. Please try again."
      );
    }
    setSubmitting(false);
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: "50vh" }}
    >
      <Grid item xs={10} sm={8} md={6}>
        <Typography variant="h4" gutterBottom align="center">
          {userType === "customer"
            ? "Customer Registration"
            : "Admin Registration"}
        </Typography>
        {success && (
          <Typography
            variant="body1"
            color="primary"
            align="center"
            gutterBottom
          >
            {success}
          </Typography>
        )}
        <Formik
          key={formKey} 
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    error={errors.firstName && touched.firstName}
                    helperText={
                      errors.firstName && touched.firstName
                        ? errors.firstName
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    error={errors.lastName && touched.lastName}
                    helperText={
                      errors.lastName && touched.lastName ? errors.lastName : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    error={errors.email && touched.email}
                    helperText={
                      errors.email && touched.email ? errors.email : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={errors.password && touched.password}
                    helperText={
                      errors.password && touched.password ? errors.password : ""
                    }
                  />
                </Grid>
              </Grid>
              {error && (
                <Typography
                  variant="body1"
                  color="error"
                  align="center"
                  gutterBottom
                >
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                style={{ marginTop: "1rem" }}
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default RegistrationForm;
