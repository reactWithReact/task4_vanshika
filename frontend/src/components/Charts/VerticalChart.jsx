import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import {
  select,
  axisBottom,
  axisRight,
  scaleLinear,
  scaleBand,
  stack,
  max,
  stackOrderAscending,
  selectAll,
} from "d3";

const VerticalChart = ({ clickedUnit, chart, data, keys, colors, bardata }) => {
  

  const wrapperRef = useRef();
  const svgRef = useRef();

  useEffect(() => {
    Object.keys(chart).map((key, index) => {
      if (key == clickedUnit) {
        setQuarters(chart[key]);
      }
    });

    console.log( data)
    const svg = select(svgRef.current);

    const stackGenerator = stack().keys(keys);
    const layers = stackGenerator(data);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])+6),
    ];

    
    const xScale = scaleBand()
      .domain(data.map((d) => d.quarters))
      .range([0, 320])
      .padding(0.5);

    const yScale = scaleLinear().domain(extent).range([350, 0]);

   
    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (layer) => colors[layer.key])
      .selectAll("rect")
      .attr("width", "20")
      .data((layer) => layer)
      .join("rect")
      .attr("x", (sequence) => xScale(sequence.data.quarters))
      .attr("y", (sequence) => yScale(sequence[1]))
      .attr("width", xScale.bandwidth())
      .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]))

      const bars = selectAll(".layer")

    bars.selectAll(".label").remove()
    bars
     .data(data)
     .append("text")
     .attr("class", "label")
     .text(function(i,k) { return i[`sumq${k+1}`]
    })
    .attr("dx", "0.3em")
    .attr("x",data=>xScale(data.quarters))
    .attr("y", (data,k) => yScale(2+data[`sumq${k+1}`]))
    // .style("transform", "translateY(65px)")
    .style("font", "20px times")
    .style("font-weight","900")
    .attr("fill", "white")


  // bars
  //    .data(data)
  //    .append("text")
  //    .attr("class", "label")
  //    .text(function(i,k) { return i[`q${k+1}`]
  //   })
  //   .attr("dx", "0.3em")
  //   .attr("x",data=>xScale(data.quarters))
  //   .attr("y", (data,k) => yScale(2+data[`q${k+1}`]))
  //   // .style("transform", "translateY(65px)")
  //   .style("font", "20px times")
  //   .style("font-weight","900")
  //   .attr("fill", "white")

     
     
    
        

        
    const xAxis = axisBottom(xScale);
    svg.select(".x-axis").attr("transform", `translate(0, 350)`) .style("font", "14px times").attr("font-weight", "900").call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select(".y-axis").style("font", "14px times").call(yAxis);
    console.log(clickedUnit);
  }, [colors, data, keys, bardata, clickedUnit]);

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginLeft: "2rem" }}>
        <svg
          ref={svgRef}
          style={{
            height: "25.5rem",
            color: "white",
            paddingTop:"2.2rem",
            backgroundColor: "rgb(66, 66, 66)",
            paddingLeft:"1rem",
            paddingRight:"0.5rem"

          }}
        >
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  );
};

export default VerticalChart;

