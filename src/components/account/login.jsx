import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { orange, deepOrange } from "@material-ui/core/colors";
import * as Yup from "yup";

import account from "../../services/accountService";
import AppForm from "../../components/common/appForm";
import Validation from "../../schemas/loginSchema";
import "../../estilos/login.css";
import { Formik } from "formik";

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
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Validation.loginSchema}
              onSubmit={(data) => console.log(data)}
            >
              {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
                <form className="formClass" onSubmit={handleSubmit}>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={errors.email}
                    helperText={errors.email}
                  />
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete="password"
                    autoFocus
                    type="password"
                    error={errors.password}
                    helperText={errors.password}
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
                </form>
              )}
            </Formik>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
