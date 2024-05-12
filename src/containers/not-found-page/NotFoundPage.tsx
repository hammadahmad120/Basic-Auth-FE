import { FC } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as NotFoundIcon } from "../../assets/NotFoundIcon.svg";
import { Box } from "@material-ui/core";

const NotFoundPage: FC = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "32px",
      }}
    >
      <NotFoundIcon />
      <Box>
        <h1>404</h1>
        <p>Page not found</p>
        <Link to="/dashboard">Go Back</Link>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
