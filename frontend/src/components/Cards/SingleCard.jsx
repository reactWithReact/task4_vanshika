import React from 'react'
import styled from 'styled-components';
import { TextWrapper } from "../Table/Table.style";
import {FaLongArrowAltUp, FaLongArrowAltDown} from 'react-icons/fa'
import './card.css'



const singleCard = ({title, value, arrow}) => {
  return (
    <>
       <TextWrapper>
            <h3>{value} - {title} 
            
            {
              arrow==0?<FaLongArrowAltDown />:<FaLongArrowAltUp style={{color:"white", marginLeft:"20px"}}/>
            }
            
            </h3>
        
            
            
           
           
            
          </TextWrapper>
    </>
  )
}

export default singleCard




