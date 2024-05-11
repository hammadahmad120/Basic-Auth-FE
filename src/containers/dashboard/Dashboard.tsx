import React, { FC, useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import { User, getUser, userLogout } from "../../services/authServices";
import { AuthAxios } from "../../services/axiosConfig";
import Spinner from "../../components/shared/spinner/Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent:"center"
  },
  toolbar: {
    paddingRight: 24,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  welcomeMsg:{
    marginTop:"160px"
  }
}));

const Dashboard:FC = () => {
  const classes = useStyles();
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true)

  const fetchUser = async() =>{
    try{
        const userResponse = await getUser();
        setUser(userResponse);
    }catch(_){
    }finally{
        setIsUserLoading(false);
    }
  }

  useEffect(()=>{
    fetchUser();
  },[]);


  const handleLogout = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    userLogout("/login");
  };

  return (
    <div className={classes.root}>
        {isUserLoading?(
            <Spinner isCenter={true} />
        ):(
            <>
        <AppBar
        position='absolute'
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            Easy Generator Test
          </Typography>
          {user?.name &&(
            <Chip
            icon={<FaceIcon />}
            label={user.name}
          />
          )}
          <IconButton
            color='inherit'
            onClick={handleLogout}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Typography
            component='h1'
            variant='h4'
            color='secondary'
            noWrap
            className={classes.welcomeMsg}
          >
            Welcome to the application
          </Typography>
        </>)}
      
    </div>
  );
}

export default Dashboard;