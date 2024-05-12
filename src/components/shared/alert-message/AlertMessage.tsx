import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { Box, Collapse, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

const alertGenericStyle: CSSProperties = {
  position: "fixed",
  left: "50%",
  transform: "translate(-50%, -50%)",
  margin: "0 auto",
};
const useStyles = makeStyles((theme) => ({
  bottomAlert: {
    bottom: "0px",
    ...alertGenericStyle,
  },
  topAlert: {
    top: "0px",
    ...alertGenericStyle,
  },
}));

interface AlertProps {
  showAlert?: boolean;
  bottomAlert?: boolean;
  severity?: "error" | "warning" | "info" | "success";
  message: string;
  styles?: Record<string, string>;
}
const AlertMessage = ({
  showAlert = true,
  bottomAlert = true,
  severity = "error",
  message,
  styles = {},
}: AlertProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(showAlert);

  useEffect(() => {
    setOpen(showAlert);
  }, [showAlert]);

  return (
    <Collapse in={open && !!message}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        severity={severity}
        className={bottomAlert ? classes.bottomAlert : classes.topAlert}
      >
        {message}
      </Alert>
    </Collapse>
  );
};

export default AlertMessage;
