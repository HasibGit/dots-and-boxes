import React from "react";
import "./Dot.css";

interface DotProps {
  shouldBlink: boolean;
}

const Dot: React.FC<DotProps> = ({ shouldBlink }) => {
  return <div className={"dot " + (shouldBlink ? "blink" : "")}></div>;
};

export default Dot;
