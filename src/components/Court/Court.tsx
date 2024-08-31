import React, { useEffect, useState } from "react";
import Dot from "../Dot/Dot";
import Line from "../Line/Line";
import {
  IBox,
  ICourtProps,
  IDotCoordinate,
  ILine,
} from "../../interfaces/app.interface";
import { CourtService } from "../../services/courtService";

const Court: React.FC<ICourtProps> = ({ rows, cols, player1, player2 }) => {
  const [dotsToBeConnected, setDotsToBeConnected] = useState<IDotCoordinate[]>(
    []
  );
  const [lines, setLines] = useState<ILine[]>([]);
  const [boxes, setBoxes] = useState<IBox[]>([]);
  const [turn, setTurn] = useState("player1");

  const courtService = new CourtService();

  useEffect(() => {
    courtService.calculateLines(lines, setLines, rows, cols);
    calculateBoxes();
  }, []);

  const calculateBoxes = () => {
    const boxesCopy = [...boxes];

    for (let i = 0; i < rows - 1; i++) {
      for (let j = 0; j < cols - 1; j++) {
        const firstLine: ILine = {
          start: { i, j },
          end: { i, j: j + 1 },
          connected: false,
        };

        const secondLine: ILine = {
          start: { i, j: j + 1 },
          end: { i: i + 1, j: j + 1 },
          connected: false,
        };

        const thirdLine: ILine = {
          start: { i: i + 1, j: j + 1 },
          end: { i: i + 1, j },
          connected: false,
        };

        const forthLine: ILine = {
          start: { i: i + 1, j },
          end: { i, j },
          connected: false,
        };

        boxesCopy.push({
          firstLine,
          secondLine,
          thirdLine,
          forthLine,
          connected: false,
          connectedBy: "",
        });
      }
    }

    setBoxes(boxesCopy);
  };

  const handleMouseHover = (i: number, j: number, direction: string) => {
    if (direction == "horizonal") {
      const firstDot: IDotCoordinate = { i, j };
      const secondDot: IDotCoordinate = { i, j: j + 1 };

      const newDotsToBeConnected = [firstDot, secondDot];
      setDotsToBeConnected(newDotsToBeConnected);
    }

    if (direction == "vertical") {
      const firstDot: IDotCoordinate = { i, j };
      const secondDot: IDotCoordinate = { i: i + 1, j };

      const newDotsToBeConnected = [firstDot, secondDot];
      setDotsToBeConnected(newDotsToBeConnected);
    }
  };

  const isDotToBeConnected = (i: number, j: number): boolean => {
    return dotsToBeConnected.some((dot) => dot.i == i && dot.j == j);
  };

  const isDotPartOfConnectedBox = (i: number, j: number): boolean => {
    const isMatchingCoordinate = (line: ILine) =>
      (line.start.i === i && line.start.j === j) ||
      (line.end.i === i && line.end.j === j);

    return boxes.some(
      (box) =>
        box.connected &&
        [box.firstLine, box.secondLine, box.thirdLine, box.forthLine].some(
          isMatchingCoordinate
        )
    );
  };

  const isLinePartOfConnectedBox = (
    i: number,
    j: number,
    alignment: string
  ): boolean => {
    if (alignment == "horizonal") {
      const firstDot: IDotCoordinate = { i, j };
      const secondDot: IDotCoordinate = { i, j: j + 1 };

      return boxes.some(
        (box) =>
          box.connected &&
          [box.firstLine, box.secondLine, box.thirdLine, box.forthLine].some(
            (line) =>
              (line.start.i == firstDot.i &&
                line.start.j == firstDot.j &&
                line.end.i == secondDot.i &&
                line.end.j == secondDot.j) ||
              (line.end.i == firstDot.i &&
                line.end.j == firstDot.j &&
                line.start.i == secondDot.i &&
                line.start.j == secondDot.j)
          )
      );
    }

    if (alignment == "vertical") {
      const firstDot: IDotCoordinate = { i, j };
      const secondDot: IDotCoordinate = { i: i + 1, j };

      return boxes.some(
        (box) =>
          box.connected &&
          [box.firstLine, box.secondLine, box.thirdLine, box.forthLine].some(
            (line) =>
              (line.start.i == firstDot.i &&
                line.start.j == firstDot.j &&
                line.end.i == secondDot.i &&
                line.end.j == secondDot.j) ||
              (line.end.i == firstDot.i &&
                line.end.j == firstDot.j &&
                line.start.i == secondDot.i &&
                line.start.j == secondDot.j)
          )
      );
    }

    return false;
  };

  const isSameDot = (
    firstDot: IDotCoordinate,
    secondDot: IDotCoordinate
  ): boolean => {
    return firstDot.i == secondDot.i && firstDot.j == secondDot.j;
  };

  const isDotPositionsMatch = (
    line: ILine,
    firstDot: IDotCoordinate,
    secondDot: IDotCoordinate
  ): boolean => {
    return (
      (isSameDot(line.start, firstDot) && isSameDot(line.end, secondDot)) ||
      (isSameDot(line.start, secondDot) && isSameDot(line.end, firstDot))
    );
  };

  const handleLineClick = (i: number, j: number, direction: string) => {
    if (direction == "horizonal") {
      const firstDot: IDotCoordinate = { i, j };
      const secondDot: IDotCoordinate = { i, j: j + 1 };

      const linesCopy = [...lines];

      linesCopy.forEach((line) => {
        if (!line.connected && isDotPositionsMatch(line, firstDot, secondDot)) {
          line.connected = true;
        }
      });

      setLines(linesCopy);

      const boxesCopy = [...boxes];

      boxesCopy.forEach((box) => {
        if (!box.connected) {
          if (
            !box.firstLine.connected &&
            isDotPositionsMatch(box.firstLine, firstDot, secondDot)
          ) {
            box.firstLine.connected = true;
          }
          if (
            !box.secondLine.connected &&
            isDotPositionsMatch(box.secondLine, firstDot, secondDot)
          ) {
            box.secondLine.connected = true;
          }
          if (
            !box.thirdLine.connected &&
            isDotPositionsMatch(box.thirdLine, firstDot, secondDot)
          ) {
            box.thirdLine.connected = true;
          }
          if (
            !box.forthLine.connected &&
            isDotPositionsMatch(box.forthLine, firstDot, secondDot)
          ) {
            box.forthLine.connected = true;
          }

          if (
            box.firstLine.connected &&
            box.secondLine.connected &&
            box.thirdLine.connected &&
            box.forthLine.connected
          ) {
            box.connected = true;
            box.connectedBy = "Hasib";
          }
        }
      });

      setBoxes(boxesCopy);
    }

    if (direction == "vertical") {
      const firstDot: IDotCoordinate = { i, j };
      const secondDot: IDotCoordinate = { i: i + 1, j };

      const linesCopy = [...lines];

      linesCopy.forEach((line) => {
        if (!line.connected && isDotPositionsMatch(line, firstDot, secondDot)) {
          line.connected = true;
        }
      });

      setLines(linesCopy);

      const boxesCopy = [...boxes];

      boxesCopy.forEach((box) => {
        if (!box.connected) {
          if (
            !box.firstLine.connected &&
            isDotPositionsMatch(box.firstLine, firstDot, secondDot)
          ) {
            box.firstLine.connected = true;
          }
          if (
            !box.secondLine.connected &&
            isDotPositionsMatch(box.secondLine, firstDot, secondDot)
          ) {
            box.secondLine.connected = true;
          }
          if (
            !box.thirdLine.connected &&
            isDotPositionsMatch(box.thirdLine, firstDot, secondDot)
          ) {
            box.thirdLine.connected = true;
          }
          if (
            !box.forthLine.connected &&
            isDotPositionsMatch(box.forthLine, firstDot, secondDot)
          ) {
            box.forthLine.connected = true;
          }

          if (
            box.firstLine.connected &&
            box.secondLine.connected &&
            box.thirdLine.connected &&
            box.forthLine.connected
          ) {
            box.connected = true;
            box.connectedBy = "Hasib";
          }
        }
      });

      setBoxes(boxesCopy);
    }

    if (turn == "player1") {
      setTurn("player2");
    } else {
      setTurn("player1");
    }
  };

  const isLineConnected = (
    i: number,
    j: number,
    direction: string
  ): boolean => {
    if (direction == "horizonal") {
      const firstDot: IDotCoordinate = { i, j };
      const secondDot: IDotCoordinate = { i, j: j + 1 };

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
      const firstDot: IDotCoordinate = { i, j };
      const secondDot: IDotCoordinate = { i: i + 1, j };

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
                  isPartOfConnectedBox={isDotPartOfConnectedBox(i, j)}
                ></Dot>
                {j < cols - 1 && (
                  <Line
                    key={i + "line" + j}
                    horizontal={true}
                    isConnected={isLineConnected(i, j, "horizonal")}
                    isPartOfConnectedBox={isLinePartOfConnectedBox(
                      i,
                      j,
                      "horizonal"
                    )}
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
                  isPartOfConnectedBox={isLinePartOfConnectedBox(
                    i,
                    j,
                    "vertical"
                  )}
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
