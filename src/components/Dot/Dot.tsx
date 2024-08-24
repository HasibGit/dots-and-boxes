import React from "react";
import "./Dot.css";
import { IDotProps } from "../../interfaces/app.interface";

const Dot: React.FC<IDotProps> = ({ shouldBlink }) => {
  return <div className={"dot " + (shouldBlink ? "blink" : "")}></div>;
};

export default Dot;
