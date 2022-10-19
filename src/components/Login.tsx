import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TypingEffect } from "./TypingEffect";

export const Login = () => {
  const navigate = useNavigate();
  const buttonStyle = {
    color: "rgb(21, 50, 67)",
    backgroundColor: "rgb(238, 240, 235)",
    margin: "8px",
  };
  const cursorRef = React.useRef<any>(null);

  return (
    <div className="login">
      <div className="titleContainer">
        <TypingEffect />
        <div ref={cursorRef} className="typingCursor">
          |
        </div>
      </div>
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
