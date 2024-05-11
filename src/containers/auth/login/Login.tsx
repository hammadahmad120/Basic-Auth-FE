import React, { FC } from "react";
import { useState } from "react";
import {
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
  Box,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  userLogin,
  setUserToLocalStorage,
} from "../../../services/authServices";
import AlertMessage from "../../../components/shared/alert-message/AlertMessage";
import axios from "axios";
import { DEFAULT_SERVER_ERROR } from "../../../constants";
import { Link } from "react-router-dom";
import AuthFooterLink from "../../../components/auth/AuthFooterLink";

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

const errorCodeMapper = {
    "INVALID_EMAIL_OR_PASSWORD": "Your email or password is incorrect",
} as any;

const validationSchema = Yup.object({
  email: Yup.string()
  .email("Invalid email address")
  .required("Email is required"),
  password: Yup.string()
    .required("Password is required"),
});

const Login: FC = () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [showpassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      setIsLoading(true);
      setServerError("");
      try{
        const loggedInUser = await userLogin(values.email, values.password);
        setIsLoading(false);
        setUserToLocalStorage({token: loggedInUser.accessToken, sub: loggedInUser.userId, email: loggedInUser.email});
        window.location.replace("/dashboard");
      }catch(err){
        setIsLoading(false);
        if (axios.isAxiosError(err)) {
            const errorCode = err.response?.data?.error || "";
            setServerError(errorCodeMapper?.[errorCode] || DEFAULT_SERVER_ERROR);
        } else setServerError(DEFAULT_SERVER_ERROR)
        }
    },
  });

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
            id='email'
            label='Email'
            name='email'
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            fullWidth
            variant='outlined'
            margin='normal'
            name='password'
            label='Password'
            type={showpassword ? 'text':'password'}
            id='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
          control={
          <Checkbox
            checked={showpassword}
            onChange={(event)=>{
                setShowPassword(event.target.checked)
            }}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        }
          label="Show Password"
          labelPlacement="end"
        />

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
        <AuthFooterLink text="Don't have an account?" linkText=" Sign up" linkTo="/register" />
        <AlertMessage showAlert={!!serverError} message={serverError} />
      </div>
    </Container>
  );
}

export default Login;
