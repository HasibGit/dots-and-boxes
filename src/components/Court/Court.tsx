import React from "react";
import Dot from "../Dot/Dot";
import Line from "../Line/Line";

interface CourtProps {
  rows: number;
  cols: number;
}

const Court: React.FC<CourtProps> = ({ rows, cols }) => {
  const handleMouseHover = (i: number, j: number, direction: string) => {
    if (direction == "horizonal") {
      const firstDot = `${i} - ${j}`;
      const secondDot = `${i} - ${j + 1}`;
      console.log(firstDot + " " + secondDot);
    }

    if (direction == "vertical") {
      const firstDot = `${i} - ${j}`;
      const secondDot = `${i + 1} - ${j}`;
      console.log(firstDot + " " + secondDot);
    }
  };

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
                <Dot key={i + "" + j}></Dot>
                {j < cols - 1 && (
                  <Line
                    key={i + "line" + j}
                    horizontal={true}
                    onMouseEnter={() => handleMouseHover(i, j, "horizonal")}
                  />
                )}
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
                <Line
                  key={i + "" + j}
                  horizontal={false}
                  onMouseEnter={() => handleMouseHover(i, j, "vertical")}
                />
              ))}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default Court;
