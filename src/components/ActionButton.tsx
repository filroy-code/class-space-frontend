import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const ActionButton = styled(Button)(() => ({
  color: "rgb(238, 240, 235)",
  backgroundColor: "rgb(21, 50, 67)",
  border: "1px solid rgb(21, 50, 67)",
  margin: "10px 0px",
  transition: "none",
  "&:hover": {
    backgroundColor: "rgb(109, 33, 60)",
    border: "1px solid rgb(21, 50, 67)",
    transition: "none",
  },
}));
