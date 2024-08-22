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
    calculateLines();
  }, []);

  const calculateLines = () => {
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

  const isSameDot = (
    firstDot: DotCoordinate,
    secondDot: DotCoordinate
  ): boolean => {
    return firstDot.i == secondDot.i && firstDot.j == secondDot.j;
  };

  const isDotPositionsMatch = (
    line: Line,
    firstDot: DotCoordinate,
    secondDot: DotCoordinate
  ): boolean => {
    return isSameDot(line.start, firstDot) && isSameDot(line.end, secondDot);
  };

  const handleLineClick = (i: number, j: number, direction: string) => {
    if (direction == "horizonal") {
      const firstDot: DotCoordinate = { i, j };
      const secondDot: DotCoordinate = { i, j: j + 1 };

      const linesCopy = [...lines];

      linesCopy.forEach((line) => {
        if (!line.connected && isDotPositionsMatch(line, firstDot, secondDot)) {
          line.connected = true;
        }
      });

      setLines(linesCopy);
    }

    if (direction == "vertical") {
      const firstDot: DotCoordinate = { i, j };
      const secondDot: DotCoordinate = { i: i + 1, j };

      const linesCopy = [...lines];

      linesCopy.forEach((line) => {
        if (!line.connected && isDotPositionsMatch(line, firstDot, secondDot)) {
          line.connected = true;
        }
      });

      setLines(linesCopy);
    }
  };

  const isLineConnected = (
    i: number,
    j: number,
    direction: string
  ): boolean => {
    if (direction == "horizonal") {
      const firstDot: DotCoordinate = { i, j };
      const secondDot: DotCoordinate = { i, j: j + 1 };

      const line = lines.find(
        (line) =>
          line.connected && isDotPositionsMatch(line, firstDot, secondDot)
      );

      if (line) {
        return true;
      } else {
        return false;
      }
    } else {
      const firstDot: DotCoordinate = { i, j };
      const secondDot: DotCoordinate = { i: i + 1, j };

      const line = lines.find(
        (line) =>
          line.connected && isDotPositionsMatch(line, firstDot, secondDot)
      );

      if (line) {
        return true;
      } else {
        return false;
      }
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
                <Dot
                  key={i + "" + j}
                  shouldBlink={isDotToBeConnected(i, j)}
                ></Dot>
                {j < cols - 1 && (
                  <Line
                    key={i + "line" + j}
                    horizontal={true}
                    isConnected={isLineConnected(i, j, "horizonal")}
                    onMouseEnter={() =>
                      !isLineConnected(i, j, "horizonal") &&
                      handleMouseHover(i, j, "horizonal")
                    }
                    onMouseLeave={() => setDotsToBeConnected([])}
                    onLineClick={() => handleLineClick(i, j, "horizonal")}
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
                  isConnected={isLineConnected(i, j, "vertical")}
                  onMouseEnter={() =>
                    !isLineConnected(i, j, "vertical") &&
                    handleMouseHover(i, j, "vertical")
                  }
                  onMouseLeave={() => setDotsToBeConnected([])}
                  onLineClick={() => handleLineClick(i, j, "vertical")}
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
