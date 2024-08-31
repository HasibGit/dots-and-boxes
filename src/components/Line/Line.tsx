import React from "react";
import styles from "./Line.module.css";
import { ILineProps } from "../../interfaces/app.interface";
import BoxLabel from "../BoxLabel/BoxLabel";

const Line: React.FC<ILineProps> = ({
  horizontal,
  isConnected,
  isPartOfConnectedBox,
  onMouseEnter,
  onMouseLeave,
  onLineClick,
  label,
}) => {
  const wrapperClass = horizontal
    ? `${styles.horizontalWrapper}`
    : `${styles.verticalWrapper}`;
  const lineClass = horizontal
    ? `${styles.horizontalLine}`
    : `${styles.verticalLine}`;

  return (
    <div
      className={wrapperClass}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onLineClick}
    >
      <div
        className={`${lineClass} ${isConnected ? `${styles.connected}` : " "} ${
          isPartOfConnectedBox ? `${styles.partOfBox}` : styles.flashing
        }`}
      >
        {label && <BoxLabel label={label}></BoxLabel>}
      </div>
    </div>
  );
};

export default Line;
