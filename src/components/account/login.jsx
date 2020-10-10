import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { orange, deepOrange } from "@material-ui/core/colors";

import account from "../../services/accountService";
import AppForm from "../../components/common/appForm";
import Validation from "../../schemas/loginSchema";
import "../../estilos/login.css";
import AppTextInput from "../common/appTextInput";
import { Button } from "@material-ui/core";

export default function Login() {
  const palletType = "dark";
  const mainPrimaryColor = orange[500];
  const mainSecondaryColor = deepOrange[900];

  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });

  function login(loginData) {
    console.log(loginData);
  }

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
            <AppForm
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Validation.loginSchema}
              onSubmit={login}
              formClass="formClass"
            >
              <AppTextInput
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <AppTextInput
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
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
              >
                Submit
              </Button>
            </AppForm>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
