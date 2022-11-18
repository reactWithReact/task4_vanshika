import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import VerticalChart from "./VerticalChart.jsx";

var data = [
  {
    quarters: "Q4",
  },
  {
    quarters: "Q3",
  },
  {
    quarters: "Q2",
  },
  {
    quarters: "Q1",
  },
];
let color={};
const HorizontalChart = (props) => {
  
  const [clickBar, setClickBar] = useState(false);
  const [clickedUnit, setClickedUnit] = useState(false);

  const [d, setD] = useState(data);
  const [bardata, setBardata] = useState([]);

  return (
    <div style={{ display: "flex", alignItems: "end", justifyContent: "end" }}>
      <Chart
        type="bar"
        options={{
          title: {
            text: "Bar chart of Buisness Unit",
            style: {
              fontSize: 20,
              color: "white",
              fontWeight: "400",
              fontFamily: "sans serif",
            },
          },

          theme: { mode: "dark" },

          chart: {
            id: "apexchart-example",
            events: {
              click(event, chartContext, config) {
                const index = bardata.indexOf(
                  config.config.xaxis.categories[config.dataPointIndex]
                );
                props.setUnit(config.config.xaxis.categories[config.dataPointIndex])
                setClickedUnit(!clickedUnit);

                var array = [];

                Object.keys(props.charts).map((key, index) => {
                  if (
                    key == config.config.xaxis.categories[config.dataPointIndex]
                  ) {
                    // console.log(props.charts[key])
                    Object.keys(props.charts[key]).map((k, i) => {
                      array.push(props.charts[key][k]);
                    });
                  }
                });

                if (index > -1) {
                  bardata.splice(index, 1);

                  data = [
                    {
                      quarters: "Q1",
                    },
                    {
                      quarters: "Q2",
                    },
                    {
                      quarters: "Q3",
                    },
                    {
                      quarters: "Q4",
                    },
                  ];
                  setD(data);
                } else {
                  bardata.push(
                    config.config.xaxis.categories[config.dataPointIndex]
                  );
                }

                if (bardata.length > 0) {
                  setClickBar(true);
                  
                  bardata.map((unit, j) => {
                    
                    data.map((d, i) => {
                      if(unit=="Corporate"){
                        color[`q${j+1}`]="#ffff33"
                      }else if(unit=="Manufacturing"){
                        color[`q${j+1}`]="#ff4d88"
                      }else if(unit=="Research & Development"){
                        color[`q${j+1}`]="#00ff00"
                      }else{
                        color[`q${j+1}`]="#884dff"
                      }
                      d[`q${j+1}`]= array[i]

                      
                    });
                    
                  });

                 
                } else {
                  data = [
                    {
                      quarters: "Q1",
                    },
                    {
                      quarters: "Q2",
                    },
                    {
                      quarters: "Q3",
                    },
                    {
                      quarters: "Q4",
                    },
                  ];
                  setD(data);
                  props.setUnit("")
                  setClickBar(false);
                }
              },
            },
          },
          colors: ["#ffff33", "#ff4d88", "#00ff00", "#884dff"],
          plotOptions: {
            bar: {
              distributed: true,
              horizontal: true,
              barHeight: "45%",
              dataLabels: {
                position: "bottom",
              },
            },
          },
          offsetX: 0,
          dropShadow: {
            enabled: true,
          },
          dataLabels: {
            enabled: true,
            textAnchor: "start",
            style: {
              colors: ["#"],
              fontSize:'15px',
              fontWeight:'900'
            },
            formatter: function (val, opt) {
              return opt.w.globals.labels[opt.dataPointIndex];
            },
          },
          xaxis: {
            categories: props.buisnessUnit,
            style: {
              fontSize: 20,
              color: "white",
              fontWeight: "400",
              fontFamily: "sans serif",
            },
          },
          yaxis: {
            labels: {
              show: false,
            },
          },
          states: {
            normal: {
              filter: {
                type: "desaturate",
              },
            },
            active: {
              allowMultipleDataPointsSelection: true,
              filter: {
                type: "darken",
                value: 1,
              },
            },
          },

          legend: {
            show: false,
          },
        }}
        series={[
          {
            name: "",
            data: props.values,
          },
        ]}
        width={400}
        height={400}
      />

      {clickBar && (
        <VerticalChart
          clickedUnit={clickedUnit}
          chart={props.charts}
          keys={["q1", "q2", "q3", "q4"]}
          colors={color}
          data={d}
          bardata={bardata}
        />
      )}
    </div>
  );
};

export default HorizontalChart;
