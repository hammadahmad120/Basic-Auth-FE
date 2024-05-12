import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  centerSpinner: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
}));

interface SpinnerProps {
  size?: number;
  isCenter?: boolean;
  color?: "primary" | "secondary" | "inherit";
  styles?: Record<string, string>;
}
const Spinner = ({
  size = 32,
  isCenter = true,
  color = "primary",
  styles = {},
}: SpinnerProps) => {
  const classes = useStyles();

  return (
    <CircularProgress
      size={size}
      color={color}
      className={isCenter ? classes.centerSpinner : ""}
      style={styles}
    />
  );
};

export default Spinner;
