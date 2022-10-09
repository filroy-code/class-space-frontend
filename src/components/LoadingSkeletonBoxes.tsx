import React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function LoadingSkeletonBoxes(props: { type: string }) {
  const boxStyle = {
    margin: "10px",
    border: "1px solid black",
  };
  return (
    <div
      className={props.type}
      style={{ display: "flex", flexDirection: "column" }}
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
