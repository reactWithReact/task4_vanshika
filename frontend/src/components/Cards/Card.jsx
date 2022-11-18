import React, { useState, useRef } from "react";
import SingleCard from "./SingleCard.jsx";
import styled from "styled-components";
import "./card.css";

const Card = (props) => {
  const ordered = Object.keys(props.cards.attribution.card).sort().reduce(
    (obj, key) => { 
      obj[key] = props.cards.attribution.card[key]; 
      return obj;
    }, 
    {}
  );


  const chart_ordered = Object.keys(props.cards.attribution.chart).sort().reduce(
    (obj, key) => { 
      obj[key] = props.cards.attribution.chart[key]; 
      return obj;
    }, 
    {}
  );
 
  const ClickHandler = () => {
    props.setExpanded(true);
    
    
    Object.keys(ordered).map((key, index) => {
      props.buisnessUnit.push(key);
      props.values.push(ordered[key]);
    });
  };
  var array=[]
  Object.keys(chart_ordered).map((k,i)=>{
console.log(chart_ordered[k])
    if(chart_ordered[k][`Q4`]<chart_ordered[k][`Q3`]){
      array.push(0)
    }else{
      array.push(1)
    }
  })
 
  

  return (
    <div className="cards">
      <div className={!props.expanded ? "box" : "none"} onClick={ClickHandler}>
        {Object.keys(ordered).map((key, index) => {

          
          return (
            <>
              <SingleCard
                title={key}
                value={ordered[key]}
                arrow={array[index]}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
