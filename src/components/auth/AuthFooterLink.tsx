import { Box } from "@material-ui/core";
import { FC } from "react";
import { Link } from "react-router-dom";

interface AuthFooterLinkProps {
    text: string;
    linkText: string;
    linkTo: string;
}
const AuthFooterLink:FC<AuthFooterLinkProps> = ({text, linkText, linkTo})=>{
    return(
    <Box style={{display: "flex", alignItems:"center", marginBottom:"32px"}}>
    <Box>
        {text}
            <Link to={linkTo}>
            {linkText}
          </Link>
      </Box>
      </Box>
);
}
export default AuthFooterLink;