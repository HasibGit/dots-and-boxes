import React from "react";
import Dot from "../Dot/Dot";
import Line from "../Line/Line";

interface CourtProps {
  rows: number;
  cols: number;
}

const Court: React.FC<CourtProps> = ({ rows, cols }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          {Array.from({ length: cols }, (_, j) => (
            <>
              <Dot key={j}></Dot>
              {j < cols - 1 && <Line horizontal={true} />}
            </>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Court;
