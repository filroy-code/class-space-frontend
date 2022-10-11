import { useD3 } from "../hooks/useD3";
import React from "react";
import * as d3 from "d3";

function BarChart(props) {
//   const [stats, updateStats] = React.useState(props.compare);

//   React.useEffect(() => {
//     updateStats(props.compare);
//   }, [props.compare]);

const stats = [
    {score: "NM", number: 2}, 
    {score: "<50%", number: 3}, 
    {score: "50-59%", number: 1}, 
    {score: "60-69%", number: 3}, 
    {score: "70-79%", number: 6}, 
    {score: "80-89%", number: 5}, 
    {score: "90-100%", number: 2}]

  const ref = useD3(
    (svg) => {
      const yScale = d3
      .scaleLinear().domain([0, 10]).range([300, 0])

      const xScale = d3
      .scaleBand()
      .domain(stats.map((dataPoint) => dataPoint.score))
      .rangeRound([0, 600])
      .padding(1);

      svg
        .classed("graph", true)
        .selectAll(".bar")
        .data(stats)
        .enter()
        .append("rect")
        .classed("bar", true)
        .attr("width", 50)
        .attr("height", (data) => yScale(data.number))
        // .transition()
        // .duration(700)
        .attr("x", (data) => {
            return xScale(data.score);
        //   if (data.comparison < 0) {
        //     return xScale(data.comparison / data.playerOne);
        //   } else {
        //     return 250;
        //   }
        })
        .attr("y", (data) => {
            return 500 - yScale(data.number)
        //   return yScale(data.number);
        })
        .attr("fill", (data) => {
            return "blue";
        })
        .transition()
        .duration(700)

      // const graphText = svg.append('g').attr('class', 'graphText');

      svg
        .selectAll("text")
        .data(stats)
        .join("text")
        .attr("x", (data) => {
            return xScale(data.score);
        })
        .attr("y", (data) => {
          return 530
        })
        .text(
          (data) => data.score
        )
        .attr("font-weight", "bold");

      // graphText
      // .selectAll("text")
      // .data(stats)
      // .enter()
      // .append("text")
      // .attr("x", (data) => {
      //     return -800;
      // })
      // .attr("y", (data) => {
      //   return yScale(data.stat) + 19;
      // })
      // .text(
      //   (data) => `${data.playerOne}`
      // );
    },
    [stats]
  );

  return (
    <svg
      className="graph"
      ref={ref}
      style={{
        paddingTop: "50px",
        marginRight: "0px",
        marginLeft: "0px",
        viewBox: "0 0 500 750",
        preserveAspectRatio: "xMinYMin meet",
      }}
    ></svg>
  );
}

export default BarChart;