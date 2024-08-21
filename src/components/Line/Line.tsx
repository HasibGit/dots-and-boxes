import React from "react";
import "./Line.css";

interface LineProps {
  horizontal: boolean;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onLineClick?: () => void;
}

const Line: React.FC<LineProps> = ({
  horizontal,
  onMouseEnter,
  onMouseLeave,
  onLineClick,
}) => {
  return (
    <div
      className={horizontal ? "horizontal-wrapper" : "vertical-wrapper"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onLineClick}
    >
      <div className={horizontal ? "horizontal-line" : "vertical-line"}></div>
    </div>
  );
};

export default Line;
