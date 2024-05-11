import React, { FC } from "react";
import { useState } from "react";
import {
  Link,
  Grid,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  makeStyles,
  CircularProgress,
  Container,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  userLogin,
  setUserToLocalStorage,
} from "../../../services/authServices";
import AlertMessage from "../../../components/shared/alert-message/AlertMessage";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login: FC = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      setIsLoading(true);
      setServerError("");
      try{
        const res = await userLogin(values.username, values.password);
        setIsLoading(false);
        console.log("Logged in----", res.data);
        //   if (res.data?.status === true) {
        //     setUserToLocalStorage(res.data.data);
        //     window.location.replace("/dashboard");
        //   }
      }catch(err){
        setIsLoading(false);
        setServerError("Some error message");
        // let errorMessage = err.message;
        // if (err.response && err.response.data && err.response.data.message)
        //   errorMessage = err.response.data.message;
        // setServerError(errorMessage);
        // setIsLoading(false);
      }
    },
  });
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            variant='outlined'
            margin='normal'
            id='username'
            label='Username'
            name='username'
            autoFocus
            value={formik.values.username}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            variant='outlined'
            margin='normal'
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <AlertMessage showAlert={!!serverError} message={serverError} />

          <Button
            disabled={isLoading ? true : false}
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {isLoading ? <CircularProgress size={20} /> : "SIGN IN"}
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Login;
