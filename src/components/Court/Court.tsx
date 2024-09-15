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
import { Button, Modal } from "antd";

const Court: React.FC<ICourtProps> = ({
  rows,
  cols,
  player1,
  player2,
  setGameStarted,
  restartGame,
  setRestartGame,
}) => {
  const [dotsToBeConnected, setDotsToBeConnected] = useState<IDotCoordinate[]>(
    []
  );
  const [lines, setLines] = useState<ILine[]>([]);
  const [boxes, setBoxes] = useState<IBox[]>([]);
  const [turn, setTurn] = useState(player1);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [countOfConnectedBoxes, setCountOfConnectedBoxes] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const courtService = new CourtService();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handlePlayAgain = () => {
    setDotsToBeConnected([]);
    setLines([]);
    setBoxes([]);
    setTurn(player1);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCountOfConnectedBoxes(0);
    courtService.calculateLines([], setLines, rows, cols);
    courtService.calculateBoxes([], setBoxes, rows, cols);
    setIsModalOpen(false);
  };

  const handleGoToMainMenu = () => {
    setIsModalOpen(false);
    setGameStarted(false);
  };

  const getGameOverTitle = () => {
    if (player1Score == player2Score) return "It's a draw! 😑";
    else if (player1Score > player2Score) return `${player1} wins! 🎉🎉`;
    else if (player2Score > player1Score) return `${player2} wins! 🎉🎉`;
  };

  useEffect(() => {
    courtService.calculateLines(lines, setLines, rows, cols);
    courtService.calculateBoxes(boxes, setBoxes, rows, cols);
  }, []);

  useEffect(() => {
    if (restartGame) {
      handlePlayAgain();
      setRestartGame(false);
    }
  }, [restartGame]);

  useEffect(() => {
    let timeOut: ReturnType<typeof setTimeout>;
    if (boxes.length > 0 && countOfConnectedBoxes == boxes.length) {
      timeOut = setTimeout(() => {
        const gameCompleteSound = new Audio("/game-complete.mp3");
        gameCompleteSound.play();
        showModal();
      }, 500);
    }

    return () => clearTimeout(timeOut);
  }, [countOfConnectedBoxes]);

  return (
    <>
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

      <Modal
        title={getGameOverTitle()}
        open={isModalOpen}
        closable={false}
        footer={[
          <Button type="primary" onClick={handlePlayAgain}>
            Play Again
          </Button>,
          <Button type="primary" onClick={handleGoToMainMenu}>
            Main Menu
          </Button>,
        ]}
      >
        <div style={{ margin: "20px 0" }}>
          <p>
            {player1}'s score: <b>{player1Score}</b>
          </p>

          <p>
            {player2}'s score: <b>{player2Score}</b>
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Court;
