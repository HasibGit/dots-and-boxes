import { ILine } from "../interfaces/app.interface";

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
}
