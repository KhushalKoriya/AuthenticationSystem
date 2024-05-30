import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Typography, CircularProgress, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Verified from "../assest/check.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  content: {
    flexGrow: 1,
    marginLeft: theme.spacing(95),
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  data: {
    marginLeft: theme.spacing(3),
  },
}));

const EmailVerificationPage = () => {
  const classes = useStyles();
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/verify-email/${token}`
        );
        setVerificationStatus(response.data);
      } catch (error) {
        setVerificationStatus("Error verifying email");
        console.error("Error verifying email:", error);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12} md={6} className={classes.content}>
        <Typography variant="h4" gutterBottom>
          Email Verification
        </Typography>
        <br />
        {verificationStatus === "Verifying..." ? (
          <Box display="flex" alignItems="center">
            <CircularProgress />
            <Typography variant="body1">{verificationStatus}</Typography>
          </Box>
        ) : verificationStatus === "Email verified successfully" ? (
          <Box display="flex" alignItems="center">
            <img src={Verified} alt="verified" className={classes.image} />
            <Typography variant="body1" className={classes.data}>
              {verificationStatus}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body1">{verificationStatus}</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default EmailVerificationPage;
