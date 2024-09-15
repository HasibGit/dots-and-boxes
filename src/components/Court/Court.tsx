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
import { LineAlignments } from "../../enums/app-enums";

const Court: React.FC<ICourtProps> = ({ rows, cols, player1, player2 }) => {
  const [dotsToBeConnected, setDotsToBeConnected] = useState<IDotCoordinate[]>(
    []
  );
  const [lines, setLines] = useState<ILine[]>([]);
  const [boxes, setBoxes] = useState<IBox[]>([]);
  const [turn, setTurn] = useState(player1);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [countOfConnectedBoxes, setCountOfConnectedBoxes] = useState(0);

  const courtService = new CourtService();

  useEffect(() => {
    courtService.calculateLines(lines, setLines, rows, cols);
    courtService.calculateBoxes(boxes, setBoxes, rows, cols);
  }, []);

  useEffect(() => {
    let timeOut: ReturnType<typeof setTimeout>;
    if (boxes.length > 0 && countOfConnectedBoxes == boxes.length) {
      timeOut = setTimeout(() => {
        alert(
          `Game Over. ${player1}'s Score: ${player1Score} | ${player2}'s Score: ${player2Score}`
        );
      }, 500);
    }

    return () => clearTimeout(timeOut);
  }, [countOfConnectedBoxes]);

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
                  shouldBlink={courtService.isDotToBeConnected(
                    i,
                    j,
                    dotsToBeConnected
                  )}
                  isPartOfConnectedBox={courtService.isDotPartOfConnectedBox(
                    i,
                    j,
                    boxes
                  )}
                ></Dot>
                {j < cols - 1 && (
                  <Line
                    key={i + "line" + j}
                    horizontal={true}
                    isConnected={courtService.isLineConnected(
                      i,
                      j,
                      LineAlignments.horizonal,
                      lines
                    )}
                    isPartOfConnectedBox={courtService.isLinePartOfConnectedBox(
                      i,
                      j,
                      LineAlignments.horizonal,
                      boxes
                    )}
                    onMouseEnter={() =>
                      !courtService.isLineConnected(
                        i,
                        j,
                        LineAlignments.horizonal,
                        lines
                      ) &&
                      courtService.handleMouseHover(
                        i,
                        j,
                        LineAlignments.horizonal,
                        setDotsToBeConnected
                      )
                    }
                    onMouseLeave={() => setDotsToBeConnected([])}
                    onLineClick={() =>
                      courtService.handleLineClick(
                        i,
                        j,
                        LineAlignments.horizonal,
                        lines,
                        boxes,
                        setLines,
                        setBoxes,
                        turn,
                        setTurn,
                        player1,
                        player2,
                        setPlayer1Score,
                        setPlayer2Score,
                        setCountOfConnectedBoxes
                      )
                    }
                    players={[player1, player2]}
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
                  isConnected={courtService.isLineConnected(
                    i,
                    j,
                    LineAlignments.vertical,
                    lines
                  )}
                  isPartOfConnectedBox={courtService.isLinePartOfConnectedBox(
                    i,
                    j,
                    LineAlignments.vertical,
                    boxes
                  )}
                  onMouseEnter={() =>
                    !courtService.isLineConnected(
                      i,
                      j,
                      LineAlignments.vertical,
                      lines
                    ) &&
                    courtService.handleMouseHover(
                      i,
                      j,
                      LineAlignments.vertical,
                      setDotsToBeConnected
                    )
                  }
                  onMouseLeave={() => setDotsToBeConnected([])}
                  onLineClick={() =>
                    courtService.handleLineClick(
                      i,
                      j,
                      LineAlignments.vertical,
                      lines,
                      boxes,
                      setLines,
                      setBoxes,
                      turn,
                      setTurn,
                      player1,
                      player2,
                      setPlayer1Score,
                      setPlayer2Score,
                      setCountOfConnectedBoxes
                    )
                  }
                  players={[player1, player2]}
                  label={courtService.getBoxLabel(i, j, boxes)}
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
