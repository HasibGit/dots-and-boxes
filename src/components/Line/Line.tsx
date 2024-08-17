import React from "react";
import "./Line.css";

interface LineProps {
  horizontal: boolean;
}

const Line: React.FC<LineProps> = ({ horizontal }) => {
  return (
    <div className={horizontal ? "horizonal-line" : "vertical-line"}></div>
  );
};

export default Line;
