import React, { Component } from "react";
import Joi from "joi-browser";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  orange,
  deepOrange
} from "@material-ui/core/colors";

import account from "../../services/accountService";
import "../../estilos/login.css";

export default function Login() {
  const palletType = "dark";
  const mainPrimaryColor = orange[500];
  const mainSecondaryColor =  deepOrange[900];

  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
    <Grid container component="main" className="gridClass">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className="loginImage" />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className="paperClass">
          <Avatar className="avatarClass">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className="formClass" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submitClass"
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
    </ThemeProvider>
  );
}