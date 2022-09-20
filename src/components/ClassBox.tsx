import React from "react";

export const ClassBox = (props: {
  nameOfClass: string;
  onClick: (event: React.MouseEvent) => void;
}) => {
  return (
    <div className="classBox" onClick={props.onClick}>
      {props.nameOfClass}
    </div>
  );
};
