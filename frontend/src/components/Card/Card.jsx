import Ccardd from "../Cards/Card";
// import { motion, AnimateSharedLayout } from "framer-motion";
import Expanded from "../Expanded/Expanded";
import { useEffect, useState } from "react";

function Card({ dashboardData ,setUnit}) {
  const [expanded, setExpanded] = useState(false);
  const [buisnessUnit, setBuisnessUnit] = useState([]);
  const [values, setValues] = useState([]);

  

  return (
    <>
      {/* <AnimateSharedLayout> */}
      <Ccardd
        setExpanded={setExpanded}
        expanded={expanded}
        cards={dashboardData}
        buisnessUnit={buisnessUnit}
        values={values}
      />

      {expanded ? (
        <Expanded
          setExpanded={setExpanded}
          cards={dashboardData}
          setValues={setValues}
          setBuisnessUnit={setBuisnessUnit}
          values={values}
          buisnessUnit={buisnessUnit}
          setUnit={setUnit}
        />
      ) : (
        " "
      )}

      {/* </AnimateSharedLayout> */}
    </>
  );
}

export default Card;
