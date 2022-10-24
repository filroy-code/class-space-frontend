import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TypingEffect } from "./TypingEffect";

export const Login = () => {
  const navigate = useNavigate();

  const cursorRef = React.useRef<any>(null);
  const buttonRef = React.useRef<any>(null);

  React.useEffect(() => {
    navigate("/user");
  });

  return (
    <div className="login">
      <div className="titleContainer">
        <TypingEffect cursorRef={cursorRef} buttonRef={buttonRef} />
        <div ref={cursorRef} className="typingCursor">
          |
        </div>
      </div>
      <div
        className="loginButton"
        ref={buttonRef}
        onClick={() => {
          navigate("/max");
        }}
      >
        ENTER
      </div>
    </div>
  );
};
