import React from "react";

export const ClassBox = (props: { nameOfClass: string }) => {
  return <div className="classBox">{props.nameOfClass}x</div>;
};
