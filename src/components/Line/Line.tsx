import React, { useEffect } from "react";
import "./Line.css";

interface LineProps {
  horizontal: boolean;
  isConnected: boolean;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onLineClick?: () => void;
}

const Line: React.FC<LineProps> = ({
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
      <div
        className={`${lineClass} ${isConnected ? "connected" : ""}`}
        id="#line"
      ></div>
    </div>
  );
};

export default Line;
