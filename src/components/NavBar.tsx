import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

export const NavBar = () => {
  let breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Logged in as: user
    </Link>,
    <Link underline="hover" key="1" color="inherit" href="/">
      My
    </Link>,
    <Link underline="hover" key="1" color="inherit" href="/">
      Friend
    </Link>,
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
