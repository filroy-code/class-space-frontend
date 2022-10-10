import React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function LoadingSkeletonBoxes(props: { type: string }) {
  const boxStyle = {
    margin: "10px",
    border: "1px solid black",
  };
  return (
    <div
      style={
        props.type === "classBoxContainer"
          ? { display: "flex", flexWrap: "wrap" }
          : { display: "flex", flexDirection: "column", flexWrap: "wrap" }
      }
    >
      <Skeleton
        variant="rectangular"
        width={"15rem"}
        height={100}
        animation="pulse"
        style={boxStyle}
      />
      <Skeleton
        variant="rectangular"
        width={"15rem"}
        height={100}
        animation="pulse"
        style={boxStyle}
      />
      <Skeleton
        variant="rectangular"
        width={"15rem"}
        height={100}
        animation="pulse"
        style={boxStyle}
      />
      <Skeleton
        variant="rectangular"
        width={"15rem"}
        height={100}
        animation="pulse"
        style={boxStyle}
      />
    </div>
  );
}
