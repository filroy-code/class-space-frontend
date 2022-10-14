import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate, useParams } from "react-router-dom";
import { NavigationContext } from "../contexts/NavigationContext";

export const NavBar = () => {
  const navigate = useNavigate();
  const linkStyle = {
    border: "1px solid black",
    padding: "5px",
    borderRadius: "5px",
  };

  type Params = {
    user: string;
    classID: string;
  };
  const { user, classID } = useParams<keyof Params>() as Params;

  const navContext = React.useContext(NavigationContext);

  let breadcrumbs = [
    user && (
      <Link
        className="navLink"
        style={linkStyle}
        key="1"
        color="inherit"
        onClick={() => navigate(`/${user}`)}
      >
        Logged in as: {user}
      </Link>
    ),
    classID && (
      <Link
        className="navLink"
        style={linkStyle}
        key="1"
        color="inherit"
        onClick={() => navigate(`/${user}/${classID}`)}
      >
        {classID.split(/_(.*)/s)[1]}
      </Link>
    ),
    navContext && (
      <Link
        className="navLink"
        style={linkStyle}
        key="1"
        color="inherit"
        href="/"
      >
        {navContext}
      </Link>
    ),
  ];
  return (
    <nav>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </nav>
  );
};
