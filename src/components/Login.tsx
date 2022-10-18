import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const buttonStyle = {
    color: "rgb(21, 50, 67)",
    backgroundColor: "rgb(238, 240, 235)",
    margin: "8px",
  };

  return (
    <div className="login">
      <h1>Class Space</h1>
      <Button
        style={buttonStyle}
        onClick={() => {
          navigate("/max");
        }}
      >
        ENTER
      </Button>
    </div>
  );
};
