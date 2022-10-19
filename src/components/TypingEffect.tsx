import React from "react";

export const TypingEffect = () => {
  const [currentText, setCurrentText] = React.useState("");
  const desiredText = "Cllass Space";
  const index = React.useRef(-1);

  React.useEffect(() => {
    setTimeout(() => {
      if (index.current < desiredText.length) {
        setCurrentText((prev) => prev + desiredText.charAt(index.current));
        index.current = index.current + 1;
      }
    }, 300);
  }, [currentText]);
  return <h1>{currentText}</h1>;
};
