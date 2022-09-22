import React from "react";
import ReactDOM from "react-dom";

function Modal({ open, children, closeModal }) {
  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div
        className="backdrop"
        style={{
          backgroundColor: "black",
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={closeModal}
      >
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
