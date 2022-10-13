import { useD3 } from "../hooks/useD3";
import React from "react";
import * as d3 from "d3";

function BarChart(props) {
  //   const [stats, updateStats] = React.useState(props.compare);

  //   React.useEffect(() => {
  //     updateStats(props.compare);
  //   }, [props.compare]);

  // const stats = [
  //     {score: "NM", number: 2},
  //     {score: "<50%", number: 3},
  //     {score: "50-59%", number: 1},
  //     {score: "60-69%", number: 3},
  //     {score: "70-79%", number: 6},
  //     {score: "80-89%", number: 5},
  //     {score: "90-100%", number: 2}]

  console.log(props.distribution);

  const ref = useD3(
    (svg) => {
      const yScale = d3.scaleLinear().domain([0, 10]).range([300, 0]);

      const xScale = d3
        .scaleBand()
        .domain(props.distribution.map((dataPoint) => dataPoint.score))
        .rangeRound([0, 600])
        .padding(1);

      svg
        .classed("graph", true)
        .selectAll(".bar")
        .data(props.distribution)
        .join("rect")
        .classed("bar", true)
        .attr("width", 50)
        .attr("x", (data) => {
          return xScale(data.score);
        })
        .transition()
        .duration(700)
        .attr("height", (data) => {
          return 300 - yScale(data.number);
        })
        .attr("y", (data) => {
          return 201 + yScale(data.number);
        })
        .attr("fill", (data) => {
          return "blue";
        })
        .transition()
        .duration(700);

      // const graphText = svg.append('g').attr('class', 'graphText');

      svg
        .selectAll("text")
        .data(props.distribution)
        .join("text")
        .attr("x", (data) => {
          return 200;
        })
        .attr("y", (data) => {
          return 150;
        })
        .text((data) => `Mark distribution for ${props.selectedAssignment}`)
        .attr("font-weight", "bold");

      svg
        .selectAll("dataText")
        .data(props.distribution)
        .join("text")
        .attr("x", (data) => {
          return xScale(data.score) + 20;
        })
        .attr("y", (data) => {
          return 300;
        })
        .attr("z-index", "10")
        .attr("font-weight", "bold")
        .text((data) => `${data.number}`);

      var x_axis = d3.axisBottom().scale(xScale);

      // svg.append("g")
      // .call(x_axis)

      var y_axis = d3.axisLeft().scale(yScale);

      svg.append("g").attr("transform", "translate(50, 200)").call(y_axis);

      svg.append("g").attr("transform", "translate(20, 510)").call(x_axis);
    },
    [props.distribution]
  );

  return (
    <svg
      className="graph"
      ref={ref}
      style={{
        paddingTop: "0px",
        marginRight: "0px",
        marginLeft: "0px",
        preserveAspectRatio: "xMinYMin meet",
      }}
    ></svg>
  );
}

export default BarChart;
