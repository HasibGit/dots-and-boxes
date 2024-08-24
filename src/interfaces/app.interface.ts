export interface ICourtProps {
  rows: number;
  cols: number;
  player1: string;
  player2: string;
}

export interface ILineProps {
  horizontal: boolean;
  isConnected: boolean;
  isPartOfConnectedBox: boolean;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onLineClick?: () => void;
}

export interface IDotProps {
  shouldBlink: boolean;
  isPartOfConnectedBox: boolean;
}

export interface IDotCoordinate {
  i: number;
  j: number;
}

export interface ILine {
  start: IDotCoordinate;
  end: IDotCoordinate;
  connected: boolean;
}

export interface IBox {
  firstLine: ILine;
  secondLine: ILine;
  thirdLine: ILine;
  forthLine: ILine;
  connected: boolean;
  connectedBy: string;
}
