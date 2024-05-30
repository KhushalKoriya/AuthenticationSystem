import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Grid } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();
  const IsloggedIn = localStorage.getItem("userData");
  useEffect(() => {
    if (IsloggedIn) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (IsloggedIn) {
      navigate("/admin/dashboard");
    }
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login/admin",
        values
      );
      const { role, token } = response.data;

      if (role === "admin") {
        login(token, role);
        navigate("/admin/dashboard");
      } else {
        setError("You are not allowed to login from here");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        "Invalid login credentials or you are not allowed to login here"
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
          Admin Login
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
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
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default AdminLogin;
