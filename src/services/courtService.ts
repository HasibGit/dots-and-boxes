import React from "react";
import { IBox, IDotCoordinate, ILine } from "../interfaces/app.interface";

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

export class CourtService {
  calculateLines(
    lines: ILine[],
    setLines: React.Dispatch<React.SetStateAction<ILine[]>>,
    rows: number,
    cols: number
  ): void {
    const linesCopy = [...lines];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols - 1; j++) {
        const line: ILine = {
          start: { i, j },
          end: { i, j: j + 1 },
          connected: false,
        };
        linesCopy.push(line);
      }
    }

    for (let j = 0; j < cols; j++) {
      for (let i = 0; i < rows - 1; i++) {
        const line: ILine = {
          start: { i, j },
          end: { i: i + 1, j },
          connected: false,
        };
        linesCopy.push(line);
      }
    }

    setLines(linesCopy);
  }

  calculateBoxes(
    boxes: IBox[],
    setBoxes: React.Dispatch<React.SetStateAction<IBox[]>>,
    rows: number,
    cols: number
  ): void {
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
  }

  handleMouseHover(
    i: number,
    j: number,
    direction: string,
    setDotsToBeConnected: React.Dispatch<React.SetStateAction<IDotCoordinate[]>>
  ): void {
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
  }

  isDotToBeConnected(
    i: number,
    j: number,
    dotsToBeConnected: IDotCoordinate[]
  ): boolean {
    return dotsToBeConnected.some((dot) => dot.i == i && dot.j == j);
  }

  isDotPartOfConnectedBox(i: number, j: number, boxes: IBox[]): boolean {
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
  }

  isLinePartOfConnectedBox(
    i: number,
    j: number,
    alignment: string,
    boxes: IBox[]
  ): boolean {
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
  }

  handleLineClick(
    i: number,
    j: number,
    direction: string,
    lines: ILine[],
    boxes: IBox[],
    setLines: React.Dispatch<React.SetStateAction<ILine[]>>,
    setBoxes: React.Dispatch<React.SetStateAction<IBox[]>>,
    turn: string,
    setTurn: React.Dispatch<React.SetStateAction<string>>
  ) {
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
  }

  isLineConnected(
    i: number,
    j: number,
    direction: string,
    lines: ILine[]
  ): boolean {
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
  }

  getBoxLabel(i: number, j: number, boxes: IBox[]): string {
    const firstDot: IDotCoordinate = { i, j };
    const secondDot: IDotCoordinate = { i, j: j + 1 };
    const thirdDot: IDotCoordinate = { i: i + 1, j: j + 1 };
    const forthDot: IDotCoordinate = { i: i + 1, j };

    const foundBox = boxes.find(
      (box) =>
        box.connected &&
        box.firstLine.start.i == firstDot.i &&
        box.firstLine.start.j == firstDot.j &&
        box.firstLine.end.i == secondDot.i &&
        box.firstLine.end.j == secondDot.j &&
        box.secondLine.start.i == secondDot.i &&
        box.secondLine.start.j == secondDot.j &&
        box.secondLine.end.i == thirdDot.i &&
        box.secondLine.end.j == thirdDot.j &&
        box.thirdLine.start.i == thirdDot.i &&
        box.thirdLine.start.j == thirdDot.j &&
        box.thirdLine.end.i == forthDot.i &&
        box.thirdLine.end.j == forthDot.j &&
        box.forthLine.start.i == forthDot.i &&
        box.forthLine.start.j == forthDot.j &&
        box.forthLine.end.i == firstDot.i &&
        box.forthLine.end.j == firstDot.j
    );

    if (foundBox) {
      return foundBox.connectedBy;
    }
  }
}
