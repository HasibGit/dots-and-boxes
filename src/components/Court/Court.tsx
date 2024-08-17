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
        <>
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {Array.from({ length: cols }, (_, j) => (
              <>
                <Dot key={j}></Dot>
                {j < cols - 1 && <Line horizontal={true} />}
              </>
            ))}
          </div>

          {i < rows - 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "38px",
              }}
            >
              {Array.from({ length: cols }, (_, j) => (
                <React.Fragment key={j}>
                  <Line horizontal={false} />
                </React.Fragment>
              ))}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default Court;
