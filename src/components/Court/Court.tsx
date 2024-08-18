import React, { useEffect, useState } from "react";
import Dot from "../Dot/Dot";
import Line from "../Line/Line";

interface CourtProps {
  rows: number;
  cols: number;
}

interface DotCoordinate {
  i: number;
  j: number;
}

interface Line {
  start: DotCoordinate;
  end: DotCoordinate;
  connected: boolean;
}

const Court: React.FC<CourtProps> = ({ rows, cols }) => {
  const [dotsToBeConnected, setDotsToBeConnected] = useState<DotCoordinate[]>(
    []
  );
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    calculateRowWisePossibleLines();
    //calculateColWisePossibleLines();
  }, []);

  const calculateRowWisePossibleLines = () => {
    const linesCopy = [...lines];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols - 1; j++) {
        const line: Line = {
          start: { i, j },
          end: { i, j: j + 1 },
          connected: false,
        };
        linesCopy.push(line);
      }
    }

    setLines(linesCopy);
  };

  const calculateColWisePossibleLines = () => {
    const linesCopy = [...lines];

    for (let j = 0; j < cols; j++) {
      for (let i = 0; i < rows - 1; i++) {
        const line: Line = {
          start: { i, j },
          end: { i: i + 1, j },
          connected: false,
        };
        linesCopy.push(line);
      }
    }

    console.log(linesCopy);
    setLines(linesCopy);
  };

  const handleMouseHover = (i: number, j: number, direction: string) => {
    if (direction == "horizonal") {
      const firstDot: DotCoordinate = { i, j };
      const secondDot: DotCoordinate = { i, j: j + 1 };

      const newDotsToBeConnected = [firstDot, secondDot];
      setDotsToBeConnected(newDotsToBeConnected);
    }

    if (direction == "vertical") {
      const firstDot: DotCoordinate = { i, j };
      const secondDot: DotCoordinate = { i: i + 1, j };

      const newDotsToBeConnected = [firstDot, secondDot];
      setDotsToBeConnected(newDotsToBeConnected);
    }
  };

  const isDotToBeConnected = (i: number, j: number): boolean => {
    return dotsToBeConnected.some((dot) => dot.i == i && dot.j == j);
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
                <Dot
                  key={i + "" + j}
                  shouldBlink={isDotToBeConnected(i, j)}
                ></Dot>
                {j < cols - 1 && (
                  <Line
                    key={i + "line" + j}
                    horizontal={true}
                    onMouseEnter={() => handleMouseHover(i, j, "horizonal")}
                    onMouseLeave={() => setDotsToBeConnected([])}
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
                  onMouseLeave={() => setDotsToBeConnected([])}
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
