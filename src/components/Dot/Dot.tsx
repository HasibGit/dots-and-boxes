import React from "react";
import styles from "./Dot.module.css";
import { IDotProps } from "../../interfaces/app.interface";

const Dot: React.FC<IDotProps> = ({ shouldBlink, isPartOfConnectedBox }) => {
  return (
    <div
      className={
        `${styles.dot} ` +
        (shouldBlink ? `${styles.blink} ` : "") +
        (isPartOfConnectedBox ? `${styles.partOfBox} ` : "")
      }
    ></div>
  );
};

export default Dot;
