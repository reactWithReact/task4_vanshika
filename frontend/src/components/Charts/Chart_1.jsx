import React, { useState, useEffect, useRef } from "react";
import "../Expanded/Expanded.css"
import VerticalChart from "./VerticalChart.jsx";
import {
  select,
  axisBottom,
  axisRight,
  scaleLinear,
  scaleBand,
  max,
  easeLinear,
} from "d3";



var dataOfStackedChart = [
    {
      quarters: "Q4",
      sumq1:0
    },
    {
      quarters: "Q3",
      sumq2:0
    },
    {
      quarters: "Q2",
      sumq3:0
    },
    {
      quarters: "Q1",
      sumq4:0
    },
  ];
  let colorOfStackedChart={};

const Chart_1 = ({ values, buisnessUnit, charts, setUnit }) => {

    const [clickBar, setClickBar] = useState(false);
    const [clickedUnit, setClickedUnit] = useState(0);

    const [d, setD] = useState(dataOfStackedChart);
  const [bardata, setBardata] = useState([]);


    const data=[{},{},{},{}];
    const colors= ["#ffff33", "#ff4d88", "#00ff00", "#884dff"]

  const margin = { top: 20, right: 10, bottom: 20, left: 10 };
  const width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


  const svgRef = useRef();
  const extent = [0, max(values)];

  useEffect(() => {
    data.map((d,i)=>{
        d.unit=buisnessUnit[i];
        d.value=values[i];
        d.color=colors[i];
    })
    
    

    const svg = select(svgRef.current).attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
    const xScale = scaleLinear().domain(extent).range([20, width]);

    const yScale = scaleBand()
      .domain(buisnessUnit.map((b) => b))
      .range([0,height]);




    const xAxis = axisBottom(xScale);

    svg.select(".x-axis").style("transform", "translateY(370px)").style("font", "16px times").call(xAxis)
    ;

    const yAxis = axisRight(yScale);
    svg.select(".y-axis")
    .style("transform", "translate(20px,10px)")
    .style("font", "16px times").call(yAxis);

    svg.select(".y-axis")
    .selectAll("g")
    .style("display","none")


    var div =select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    ;

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "bars")
      .append("rect")
      .on("mouseover", function (d, i) {
          console.log(d.toElement.__data__.unit)
        select(this)
             .attr('opacity', "0.65")
             .attr('cursor',"pointer")
             ;
            
             div
               .style("opacity", 1)
               .style("top",`${70+yScale(d.toElement.__data__.unit)}px`)
               
             div.html(d.toElement.__data__.unit+"<br>"+"<div></div>"+d.toElement.__data__.value )
            
             div.select("div")
             .style("background-color",d.toElement.__data__.color)

             
             
    })
    .on("mouseout",function(d){
        select(this)
        .attr('fill', d=>d.color)
        .attr("opacity","1")
        div.transition()
               .duration('200')
            .style("opacity",0)
        ;
       
    })
      .attr("class","bar")
      .transition()
      .ease(easeLinear)
      .duration(500)
      .attr("x",-150)
      .attr("y", b=>yScale(b.unit))
      .attr("width",b=> xScale(b.value)-17)
      .attr("fill", b=>b.color)
      .attr("height","40px")
      .style("transform", "translate(170px,36px)")



      var bars = svg.selectAll(".bars");

      var bar= svg.selectAll(".bar")
      
     


      bars.append("text")
        .attr("class", "label")
        .text(function(d) { return d.unit; })
        .attr("x",40)
        .attr("y", b=>yScale(b.unit))
        .style("transform", "translateY(65px)")
        .style("font", "20px times")
        .style("font-weight","900")

        bars.append("line")
        .attr("class","line").
        style("stroke", "white")
        .style("stroke-width", 1)
        .attr("x1", 20)
        .attr("y1",(b,i)=> height/4*i+10)
        .attr("x2",width)
        .attr("y2",(b,i)=> height/4*i+10)
        
        
        bar.on("click",
        function (d,i){
            select(this)

           
            const index = bardata.indexOf(
                d.target.__data__.unit
              );
              setUnit( d.target.__data__.unit)
            
            setClickedUnit(d.pointerId);
            console.log(clickedUnit)


            var array = [];
           
           

              if (index > -1) {
                bardata.splice(index, 1);

                dataOfStackedChart = [
                  {
                    quarters: "Q4",
                    sumq1:0
                  },
                  {
                    quarters: "Q3",
                    sumq2:0
                  },
                  {
                    quarters: "Q2",
                    sumq3:0
                  },
                  {
                    quarters: "Q1",
                    sumq4:0
                  },
                ];
                setD(dataOfStackedChart);
              } else {
                bardata.push(
                    d.target.__data__.unit
                );
              }

              dataOfStackedChart.map((d, i) => {
                d[`sumq${i+1}`]=0
              })


              if (bardata.length > 0) {
                setClickBar(true);
                
                bardata.map((unit, j) => {

                  Object.keys(charts).map((key, index) => {
                    if (
                      key == unit
                    ) {
                     
                      Object.keys(charts[key]).map((k, i) => {
                        array.push(charts[key][k]);
                      });
                    }
                  });

                  

                  
                  dataOfStackedChart.map((d, i) => {
                   
                    if(unit=="Corporate"){
                      colorOfStackedChart[`q${j+1}`]="#ffff33"
                    }else if(unit=="Manufacturing"){
                      colorOfStackedChart[`q${j+1}`]="#ff4d88"
                    }else if(unit=="Research & Development"){
                      colorOfStackedChart[`q${j+1}`]="#00ff00"
                    }else{
                      colorOfStackedChart[`q${j+1}`]="#884dff"
                    }
                    d[`q${j+1}`]= array[i]
                   
                    d[`sumq${i+1}`]+=array[i]
                   

                  });
                  array=[]
                  // console.log( d[`sumq${1}`])
                  
                 
                });

               
              } else {
                dataOfStackedChart = [
                  {
                    quarters: "Q4",
                    sumq1:0
                  },
                  {
                    quarters: "Q3",
                    sumq2:0
                  },
                  {
                    quarters: "Q2",
                    sumq3:0
                  },
                  {
                    quarters: "Q1",
                    sumq4:0
                  },
                ];
                setD(dataOfStackedChart);
                setUnit("")
                setClickBar(false);
              }




        })
       

      
        
          
          
        
      
      
      

       
        
        
      
  }, [values]);

  return (
    <>
      <svg ref={svgRef}
        
        style={{
          height: "25.5rem",
          color: "white",
          backgroundColor:"rgb(66,66,66)",
          
        }}
      >
       
        <g className="x-axis" />
        <g className="y-axis" />
       
      </svg>

      {clickBar && (
        <VerticalChart
          clickedUnit={clickedUnit}

          chart={charts}
          keys={["q1", "q2", "q3", "q4"]}
          colors={colorOfStackedChart}
          data={d}
          bardata={bardata}
        />
      )}
    </>
  );
};

export default Chart_1;
