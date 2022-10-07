import React from "react";
import { useD3 } from "../hooks/useD3";
import { PieChart } from "./D3PieChart";

export const SummaryPieChart = (props) => {
  const chart = useD3(PieChart(props.assignmentArray, {
    name: (d) => d.name,
    value: (d) => d.weight,
    // viewBox: "0 0 500 500",
    // preserveAspectRatio: "xMinYMin meet",
  }), [props.assignmentArray]);

  return (
    <svg
      className="graph"
      ref={chart}
      style={{
        paddingTop: "50px",
        marginRight: "0px",
        marginLeft: "0px",
        // viewBox: "0 0 500 750",
        // preserveAspectRatio: "xMinYMin meet",
      }}
    ></svg>
  );
};
