import { FC } from "react";
import { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  makeStyles,
  CircularProgress,
  Container,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  userLogin,
  setUserToLocalStorage,
  registerUser,
} from "../../../services/authServices";
import AlertMessage from "../../../components/shared/alert-message/AlertMessage";
import axios from "axios";
import { DEFAULT_SERVER_ERROR } from "../../../constants";
import AuthFooterLink from "../../../components/auth/AuthFooterLink";
import { AccountCircle } from "@material-ui/icons";

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
    "USER_ALREADY_EXIST": "Email address already taken",
} as any;

const validationSchema = Yup.object({
  name: Yup.string()
  .min(2,"Name must contain atleast 2 characters")
  .max(60,"Name should not be more then 60 characters")
  .required("Name is required"),
  email: Yup.string()
  .email("Invalid email address")
  .required("Email is required"),
  password: Yup
    .string()
    .required("Please enter your password")
    .max(30, "Password should not be more then 30 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain atleast 8 characters with atleast 1 letter, 1 number and 1 special character"
    ),
  confirmPassword: Yup.string()
  .test('passwords-match', ' Password and Confirm Password must match', function(value){
    return this.parent.password === value
  })
});

const RegisterUser: FC = () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState("");

  const formik = useFormik({
    initialValues: {
      name:"",
      email: "",
      password: "",
      confirmPassword:""
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      setIsLoading(true);
      setServerError("");
      try{
        const registeredUser = await registerUser(values.email, values.password, values.name);
        setIsLoading(false);
        setUserToLocalStorage({token: registeredUser.accessToken, sub: registeredUser.userId, email: registeredUser.email});
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
          <AccountCircle />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
            fullWidth
            variant='outlined'
            margin='normal'
            id='name'
            label='Name'
            name='name'
            autoFocus
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
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
            type='password'
            id='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            variant='outlined'
            margin='normal'
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            id='password'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />

          <Button
            disabled={isLoading ? true : false}
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {isLoading ? <CircularProgress size={20} /> : "SIGN Up"}
          </Button>
        </form>
        <AuthFooterLink text="Already have an account?" linkText=" Sign in" linkTo="/login" />
        <AlertMessage showAlert={!!serverError} message={serverError} />
      </div>
    </Container>
  );
}

export default RegisterUser;
