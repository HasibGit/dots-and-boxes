import React from "react";
import "./Line.css";
import { ILineProps } from "../../interfaces/app.interface";

const Line: React.FC<ILineProps> = ({
  horizontal,
  isConnected,
  onMouseEnter,
  onMouseLeave,
  onLineClick,
}) => {
  const wrapperClass = horizontal ? "horizontal-wrapper" : "vertical-wrapper";
  const lineClass = horizontal ? "horizontal-line" : "vertical-line";

  return (
    <div
      className={wrapperClass}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onLineClick}
    >
      <div className={`${lineClass} ${isConnected ? "connected" : ""}`}></div>
    </div>
  );
};

export default Line;
