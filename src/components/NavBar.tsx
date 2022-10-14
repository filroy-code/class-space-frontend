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
      <div
        className="navLink"
        key="1"
        style={linkStyle}
        onClick={() => navigate(`/${user}`)}
      >
        Logged in as: {user}
      </div>
    ),
    classID && (
      <div
        className="navLink"
        key="2"
        style={linkStyle}
        onClick={() => navigate(`/${user}/${classID}`)}
      >
        {classID.split(/_(.*)/s)[1]}
      </div>
    ),
    navContext && (
      <div
        className="navLink"
        key="3"
        style={linkStyle}
        onClick={() => navigate(`/${user}/${classID}/${navContext}`)}
      >
        {navContext}
      </div>
    ),
  ];
  return (
    <nav>
      <Breadcrumbs
        separator={<NavigateNextIcon className="navArrow" fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </nav>
  );
};
