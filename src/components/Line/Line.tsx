import React from "react";
import "./Line.css";

interface LineProps {
  horizontal: boolean;
}

const Line: React.FC<LineProps> = ({ horizontal }) => {
  return (
    <div className={horizontal ? "horizontal-wrapper" : "vertical-wrapper"}>
      <div className={horizontal ? "horizontal-line" : "vertical-line"}></div>
    </div>
  );
};

export default Line;
