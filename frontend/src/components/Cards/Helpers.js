import { object } from "prop-types";

export const isEmpty= (obj)=>{
    if(!obj) return true;
    if(Object.keys(obj)[0]===undefined) return true;
    return false;
}