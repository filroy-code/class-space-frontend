import React from "react";

export const TypingEffect = (props: { cursorRef: any; buttonRef: any }) => {
  const [currentText, setCurrentText] = React.useState("");
  const desiredText = "Cllass Space";
  const index = React.useRef(-1);

  React.useEffect(() => {
    let timeout = setTimeout(() => {
      if (index.current < desiredText.length) {
        setCurrentText((prev) => prev + desiredText.charAt(index.current));
        index.current = index.current + 1;
      }

      if (index.current === desiredText.length) {
        props.cursorRef.current.classList.add("completed");
        props.buttonRef.current.classList.add("visible");
        clearTimeout(timeout);
      }
    }, 300);
  }, [currentText]);
  return <h1>{currentText}</h1>;
};
