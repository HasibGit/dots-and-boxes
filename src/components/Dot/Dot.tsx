import React from "react";
import "./Dot.css";
import { IDotProps } from "../../interfaces/app.interface";

const Dot: React.FC<IDotProps> = ({ shouldBlink, isPartOfConnectedBox }) => {
  return (
    <div
      className={
        "dot " +
        (shouldBlink ? "blink " : "") +
        (isPartOfConnectedBox ? "part-of-box" : "")
      }
    ></div>
  );
};

export default Dot;
