import React from "react";
import { Grid, Typography } from "@material-ui/core";

const AdminDashboard = () => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} md={6}>
        <Typography variant="h2" align="center" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" align="center">
          Welcome, Admin!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
