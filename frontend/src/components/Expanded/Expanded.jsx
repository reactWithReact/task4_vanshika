import React, { useRef, useEffect, useState } from "react";
import "./Expanded.css";
import { ImCross } from "react-icons/im";
import HorizontalChart from "../Charts/HorizontalChart";
import Chart_1 from "../Charts/Chart_1";

const Expanded = (props) => {
  const crossButton = () => {
    props.setExpanded(false);
    props.setValues([]);
    props.setBuisnessUnit([]);
  };

  return (
    <div className="boxx">
      <div className="container">
        {props.title}
        <span
          style={{ float: "right", paddingRight: "10px" }}
          onClick={crossButton}
        >
          <ImCross />
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "30rem",
            alignItems: "center",
          }}
        >
          {/* <HorizontalChart
            values={props.values}
            buisnessUnit={props.buisnessUnit}
            charts={props.cards.attribution.chart}
            setUnit={props.setUnit}
          /> */}
          <Chart_1
          values={props.values}
          buisnessUnit={props.buisnessUnit}
          charts={props.cards.attribution.chart}
          setUnit={props.setUnit}
          />
        </div>
      </div>
    </div>
  );
};

export default Expanded;
